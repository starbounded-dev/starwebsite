# Audio

Audio is built into LuxEngine. Nothing needs installing, and nothing ships beside an exported game. It has two halves:

- **Playback** runs on [miniaudio](https://miniaud.io/), compiled into the engine. You author **Sounds** in the editor, group them into **Sound Banks** that load together, and mix them in the **Audio Mixer**.
- **Acoustics** come from **Soundwave**, the engine's own acoustic kernel. It muffles a sound behind a wall according to the wall's material, finds routes around corners and through doorways so a source next door stays audible, and measures the reverb of the room around the listener. The listener's reverb rays run on the GPU, and the per-source solves run on worker threads.

!!! note "Which version this describes"
    This is the audio engine on [`feature/lucky-merge`](https://github.com/starbounded-dev/LuxEngine/tree/feature/lucky-merge), which replaced FMOD in November 2026 and is on its way into `dev` through [pull request 36](https://github.com/starbounded-dev/LuxEngine/pull/36). Until that merges, `dev` still uses FMOD.

## Try the demo

The sample project has an `AudioDemo` scene with two Sounds: a short effect with random pitch on an emitter you control, and a looping, streaming music bed inside a building.

1. Open `Editor/LuxSampleProject/LuxSample.luxproj`, then `Assets/Scenes/AudioDemo.luxscene`.
2. Press **Play** and click the game view so it has keyboard focus. The console says `Audio Demo ready`.
3. Hold the right mouse button and use **W/A/S/D** to move the listener (**Q/E** for down and up, **Left Shift** to go faster). Walk around the walls.

| Key | Action |
| --- | --- |
| **K** | Restart the Audio Source's Sound |
| **L** | Fire an extra one-shot at the emitter |
| **I** | Start or restart an independent instance |
| **P** | Pause or resume the Audio Source |
| **O** | Stop the Audio Source and the independent instance |
| **F** | Open or close the door. The door panel and its acoustic portal slide together. |
| **C** | Start or stop the showcase camera path |

Turn on **See the Sound** (below) and stand outside the building: the music is muffled. Press **F** and watch the muffling go as the door opens.

## Make a Sound

1. Drop a `.wav`, `.ogg`, `.mp3` or `.flac` file into the Content Browser. It becomes an Audio asset.
2. Right-click, choose **New → Sound**, and double-click the new Sound to open the **Sound Editor**.
3. Build it from clips and containers: **random**, **sequence**, **layer** and **switch**. Add volume and pitch variation, loop regions, streaming, 3D attenuation, parameters with curves, instance limits, and the bus it plays through.
4. Use it on an **Audio Source**, as a zone's ambience, in the music director, in a dialogue line, or from a script's `Sound` field.

Saving a Sound reaches instances that are already playing, in Play and in previews. Volume, pitch, curves, parameters, attenuation and the bus change in place; changing the node tree, the clips, loops, streaming or 3D restarts them. The Sound Editor has an audition voice, waveform thumbnails, and a **Music** section that draws the clip's waveform under bar and beat lines and markers, which you can drag.

## Sound Banks

A Sound Bank (`.lbank`) is a list of Sounds that load and unload together. Create one with **New → Sound Bank** in the Content Browser; it starts with whatever Sounds you had selected. Double-click it to open the **Sound Bank Editor**:

| Control | What it does |
| --- | --- |
| Resident | Loads the bank when the game starts and never unloads it. For Sounds every scene uses. |
| Sounds | Add or remove Sounds. A Sound can be in several banks. |
| Memory when loaded | The decoded size of its clips. Streamed Sounds only hold stream pages. |
| Sounds in no bank | Every Sound no bank holds, with a button to add it here. |

A scene lists the banks it needs under **Scene Sound Banks**, at the bottom of the Audio Mixer. The scene loads those clips before it plays and frees them when it stops. Clips decode off the main thread and are freed when nothing holds them.

A Sound that isn't in any loaded bank still plays, but it loads the first time it plays, which can stall that frame. Debug builds warn about it once, and export validation lists every Sound a scene plays that no bank holds.

## The Audio Mixer

**View → Audio Mixer** edits the project's mix. New projects start with Music, SFX, Dialogue and Ambience buses under the master.

| Part | What it does |
| --- | --- |
| Buses | Each bus has a volume (0 to 4, linear, with dB shown) and Mute, applied live. Add child buses, rename or remove them. A Sound on a missing bus plays through the master. |
| Effects | Up to eight per bus, in order: low-pass, high-pass, peaking EQ, delay and compressor. |
| VCAs | Named groups of buses, scaled together. Scripts set them with `Audio.SetVCAVolume("vca:/Name", volume)`. |
| Reverb return | The built-in reverb every voice sends to: room size, damping, width and return volume. Soundwave sets how much each voice sends. |
| Snapshots | Named mix changes with a priority and per-bus volume overrides. An Audio Zone's weight drives its snapshot's intensity. |

Bus layout, reverb and snapshot changes take effect when you press **Apply**, which restarts the audio engine; it's disabled during Play. **Save Project** writes the mixer into the `.luxproj`. Each edit is one undo step.

## The five audio components

**Add Component → Audio** in the inspector offers:

| Component | What it does |
| --- | --- |
| **Audio Source** | Plays a Sound from the entity, with volume, pitch and Play On Awake. |
| **Audio Listener** | Where the player hears from. Up to eight, each with an index and a weight. |
| **Audio Zone** | A region that blends in an ambience Sound and a mixer snapshot as the listener walks into it. |
| **Audio Portal** | A rectangular opening between two zones, like a door. Soundwave treats it as a shutter that opens and closes. |
| **Audio Surface** | Overrides the acoustic material a mesh collider would otherwise supply. |

## Acoustic materials

Soundwave sees your level through its **mesh colliders** and any closed portals, not through what's rendered. Each collider has an acoustic material, such as Brick, which sets how much sound passes through it.

The easy way to set it is on the render material. Under **Material Editor → Acoustics → Acoustic Material**, pick one, for example Bricks → Brick, and leave **Inherit From Material** ticked on the collider. Choosing a material then sets how a wall looks and how it sounds. New colliders inherit by default; colliders from older scenes keep their explicit tag until you tick the box. The collider shows the **Effective Acoustics** it's using.

## Tuning Soundwave

**Project Settings → Audio → Soundwave acoustics** controls what muffles a source (a low-pass filter and gain on its voice) and how wet the room sounds.

- Soundwave walks the direct path from the listener to each source through acoustic geometry and closed portals. Each wall's loss comes from its material's transmission data; a 0.3 m brick wall takes off about 18 dB. It then adds reflection and doorway routes, so a source around a corner stays audible.
- **Transmission Strength** scales every wall. **Acoustic Rate** and **Sources per Frame** cap the cost. **Maximum Bounces**, **Reflection Depth**, **Opening Samples** and the work budgets bound the search.
- **Reverb Rays**, **Reverb Bounces** and **Reverb Reference Decay** control the listener's reverb measurement.
- **Air Absorption LF/HF**, in dB per 100 m, darkens reflected and doorway sound over its extra distance and shortens the reverb. A Sound's own distance attenuation still decides how it fades with distance, so nothing fades twice.

Changes apply on the next Play. **Zone Reverb** in the same section decides how zone reverb and Soundwave's reverb combine: layer both, prefer zones, or prefer Soundwave.

## See the Sound

During Play, **See the Sound** draws the acoustics in the viewport. It's in the viewport's options popup (the gear) and in the Audio Debugger. It turns on these overlays and restores your previous settings when you turn it off:

- **Occlusion paths**: a line from the listener to each source, green when clear and red when blocked, with each wall labelled by material, thickness and loss, like `Brick 0.30 m -9.0 dB`. The reflection and doorway routes Soundwave found are drawn fainter. The lines draw through walls so you can see the blocked part, and they reuse the solve's results, so they cost nothing extra.
- **Zones and portals**, each one brightened by its live weight, or by how open it is.
- **Room acoustics readout**, in the corner: the listener's room's 60 dB decay time, reverb send, escaping energy and mean free path.
- **Emitters**: rings at the listener and every source.

**Acoustic Materials**, in the same popup, tints every surface Soundwave can see by its material and shows a legend. It works outside Play too.

## The Audio Debugger

**View → Audio Debugger** is a read-only window onto the live audio stack. Most of it fills in during Play.

| Section | What it tells you |
| --- | --- |
| Backends | Whether miniaudio started, with its version and sample rate, and whether Soundwave is running |
| Playback | Sound instances playing |
| Sound Banks and Clips | Every loaded bank and every clip in memory, with its size and whether it streams |
| Soundwave Acoustics | Triangle and mesh counts, pending geometry, source solves and failures, and the listener's reverb |
| Sources | Per source: Sound, distance, state, occlusion, muffle, and the paths found (`3R 1O x2` means three reflections, one opening, two bounces deep; `!` means a budget ran out) |
| Budgets and Bus Meters | Real and virtual voices against budget, CPU, clip memory, and each bus's peak and RMS in dBFS |
| Audio Validation | Missing Sounds or clips, the wrong playback kind, Sounds in no bank |

Check **Audio Validation** before you export. It reports the problems that make an exported game silent.

## Scripting audio

```csharp
using Lux;

public class Crate : Entity
{
    public Sound Hit;          // assign both in the inspector
    public SoundBank Level;

    void OnCreate()
    {
        Audio.LoadBank(Level);
    }

    protected override void OnCollisionBegin(Entity other)
    {
        Audio.PlayOneShot(Hit, Translation);
    }
}
```

`Audio.CreateInstance(sound)` returns an instance you can start, stop, and change the volume and pitch of. The `Audio` class also sets bus volumes and mutes, VCA volumes, global parameters and snapshots, and `Audio.PlayFootstep` plays the right footstep for the surface under a character. `Music`, `Dialogue` and `Accessibility` drive the systems below. See [Scripting](scripting.md) and the generated API reference in the editor's Help panel.

## What else is built in

- **Zones and ambience**, blending ambience Sounds and mixer snapshots as listeners move.
- **An interactive music director**, with states, intensity, layers, stingers and timeline callbacks. It needs a 2D, continuous Sound, and music transitions are sample-accurate.
- **Surface sounds**: Jolt contacts and ground checks trigger footstep, impact, scrape and roll Sounds from a surface table (`.lsurfaces`) keyed by acoustic material.
- **Dialogue**: localised dialogue tables (`.ldialogue`) with a recording per language, subtitles and narration.
- **Accessibility**: gain per category, mono fold-down and compression, narration that ducks the rest of the mix, captions and directional cues.
- **Budgets and desktop profiles**: voice, CPU and memory budgets that the debugger warns against, with per-OS overrides.

Audio longer than the **File Streaming Threshold** (0 to 600 seconds) streams instead of loading into memory. In an exported game, audio is read in place from the asset pack, so long music streams straight from it.

## Projects made with FMOD

Projects from before November 2026 may still reference FMOD events. Those references never play. An Audio Source that has an old event but no Sound logs a message saying so; assign it a Sound, and the inspector shows the old event so you know what it was.

**Project Settings → Audio → Legacy FMOD Data → Scan for FMOD Data** lists every FMOD reference left in the project, with file, line, field and value. **Remove FMOD Data** asks first, then deletes them from every file and leaves every other line alone. It doesn't touch FMOD Studio project folders on disk.

## Testing without a sound card

The native audio tests render offline, with no audio device:

```bash
cmake -S tests/audio/native -B bin/native-audio-tests
cmake --build bin/native-audio-tests
ctest --test-dir bin/native-audio-tests     # playback, Sounds, banks, mixer, music, dialogue, streaming
python tests/audio/run.py                   # Linux: streams, packs, Jolt contacts, occlusion, music
python tests/audio/run_managed.py           # the C# audio bindings
```
