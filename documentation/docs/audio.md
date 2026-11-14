# Audio

LuxEngine's audio has two halves. **FMOD Studio** plays every sound: you author events, banks, buses and snapshots in FMOD Studio, and the engine loads and drives them. **Asterwave** handles acoustics. It traces rays through the level's geometry to work out reverb and room ambience, and it decides how much a wall muffles a sound by what the wall is made of.

Both are required. There's no fallback backend, and both end up in every game you export. See [Getting started](getting-started.md) for installing FMOD and fetching Asterwave, which lives in a private repository.

## Hook up an FMOD Studio project

1. Open **View → Project Settings → Audio**.
2. Set **Studio Project (.fspro)** to your project's path, relative to the project's `Assets` folder.
3. Set **Bank Output** to the **folder** FMOD Studio builds into, such as `Build/Desktop`, relative to the `.fspro`. It's a folder, not a `.bank` file, and getting this wrong is the most common reason for silence.
4. Optional: turn on **Rebuild Banks On Play**. It needs FMOD Studio's command-line tool, `fmodstudiocl`, on `PATH`, or `LUX_FMOD_STUDIO_CL` pointing at it.
5. Optional: turn on **Live Update** so FMOD Studio can connect to the running editor.

Most audio settings take effect when the project reopens. The sample project's `Editor/LuxSampleProject/FMOD_SETUP.md` walks through a complete setup.

## The five audio components

**Add Component → Audio** in the inspector offers these:

| Component | What it does |
| --- | --- |
| **Audio Source** | Plays a Studio event from the entity. Pick a bank to filter the list, then an event. You can override authored Studio parameters per source. Play On Awake, volume and pitch are here; looping isn't, because it's authored in the event's timeline. |
| **Audio Listener** | Where the player hears from. Up to eight, each with an index and a weight. |
| **Audio Zone** | A region that blends an ambience event and a mixer snapshot in as the listener walks into it. |
| **Audio Portal** | A rectangular opening between two zones, like a door. Asterwave treats it as a shutter that can open and close. |
| **Audio Surface** | Overrides the acoustic material a mesh collider would otherwise supply. |

If an Audio Source's event list is empty, the banks either aren't built or aren't loaded. The Audio Debugger's Banks section will tell you which.

## Acoustic materials

The acoustics see your level through its **mesh colliders** and any closed portals, not through what's rendered. Each collider has an acoustic material, such as Brick, and that material sets how much sound passes through.

The easy way to set it is on the render material. Under **Material Editor → Acoustics → Acoustic Material**, choose one, for example Bricks → Brick, and leave **Inherit From Material** ticked on the collider. Choosing a material then sets how a wall looks and how it sounds. New colliders inherit by default. Colliders from older scenes keep their explicit tag until you tick the box. The collider shows the **Effective Acoustics** it's actually using.

## Occlusion

A sound behind a wall gets muffled through its event's `Occlusion` parameter. **Project Settings → Audio → Occlusion** picks who computes it:

- **Engine raycasts**, the default. The engine casts from the listener to each source through acoustic colliders and closed portals. Each wall's loss comes from its material's transmission data; a 0.3 m brick wall takes off about 18 dB. **Occlusion Strength** scales every wall, and **Rate** and **Casts / Frame** cap the cost.
- **Asterwave (raytraced)**, which uses Asterwave's own per-source result instead.

The change applies on the next Play. The Audio Debugger warns about source events that have no `Occlusion` parameter.

**Zone Reverb** in the same section decides how zone reverb and Asterwave's reverb combine: layer both, prefer zones, or prefer Asterwave.

## See the Sound

During Play, **See the Sound** draws the acoustics in the viewport. It's in the viewport's options popup (the gear) and in the Audio Debugger, and it turns on a showcase set of overlays, then restores your previous settings when you turn it off:

- **Occlusion paths**: a line from the listener to each source, green when clear and red when blocked. Every wall it crosses is labelled with its material, thickness and loss, like `Brick 0.30 m -9.0 dB`. The lines draw through walls so you can see the blocked part.
- **Zones and portals**: each one brightened by its live weight, or by how open it is.
- **Room acoustics readout**: in the corner of the viewport, returned against escaping energy, low and high frequency decay, absorption and scattering, as Asterwave measures the listener's room.
- **Bounces coloured by material**: each point where a ray bounced, tinted by the material it hit.

**Acoustic Materials**, also in the options popup, tints every surface the acoustics can see by its material and shows a legend. It works in Edit mode too.

The Audio Debugger also has raw **Asterwave rays**: ray count (64 by default), bounce count (4), update interval (50 ms), and toggles for paths, bounce points, emitters and normals. These cost real ray tracing work and feed nothing back into what you hear. They're off by default; turn them off again when you're done looking.

## The Audio Debugger

**View → Audio Debugger** is a read-only window onto the live audio stack. Most of it only fills in during Play.

| Section | What it tells you |
| --- | --- |
| Backends | Whether FMOD and Asterwave started, with versions |
| Playback | Channels playing, DSP CPU, event instances |
| Banks and Events | Every loaded bank, and a searchable list of the events they contain |
| Acoustics | World bounds, triangle counts, and timings for the last ray tracing batch |
| Ambience and Reverb | What Asterwave computed at the listener: ambient gain, decay time, density, diffusion |
| Sources | Per source: event, distance, state, occlusion and muffle |
| Budgets and Bus Meters | Real and virtual voices against budget, CPU, memory, and each bus's peak and RMS in dBFS |
| Audio Validation | Missing events, wrong event kinds, corrupt banks |

Check **Audio Validation** before you export. It reports the same failures that make an exported game silent, and it's much easier to read there than in the log.

## What else is built in

Each of these has its own design note in the engine's [`docs/`](https://github.com/starbounded-dev/LuxEngine/tree/dev/docs), with the FMOD Studio setup it expects:

- **Zones and snapshots** ([AUDIO_ZONES](https://github.com/starbounded-dev/LuxEngine/blob/dev/docs/AUDIO_ZONES.md)): ambience beds and mixer snapshots that blend as listeners move. A snapshot's `Intensity` dial has to be exposed as a parameter.
- **Interactive music** ([AUDIO_MUSIC](https://github.com/starbounded-dev/LuxEngine/blob/dev/docs/AUDIO_MUSIC.md)): one 2D music bed per scene, driven by an `Intensity` parameter from 0 to 1 and a labelled `State` parameter, plus stingers played over it. FMOD Studio owns the arrangement and transitions.
- **Surface sounds** ([AUDIO_SURFACES](https://github.com/starbounded-dev/LuxEngine/blob/dev/docs/AUDIO_SURFACES.md)): Jolt contacts and ground checks trigger footstep, impact, scrape and roll events from a surface table (`.lsurfaces`) keyed by acoustic material.
- **Dialogue** ([AUDIO_DIALOGUE](https://github.com/starbounded-dev/LuxEngine/blob/dev/docs/AUDIO_DIALOGUE.md)): localised dialogue tables (`.ldialogue`), programmer instruments for speech, and subtitles your scripts draw.
- **Accessibility** ([AUDIO_ACCESSIBILITY](https://github.com/starbounded-dev/LuxEngine/blob/dev/docs/AUDIO_ACCESSIBILITY.md)): gain per category (Music, SFX, Dialogue, UI, Ambience), mono and compressor options, narration that ducks the rest of the mix, captions and directional cues.
- **Budgets and desktop profiles**: voice, CPU and memory budgets that the debugger warns against, and per-OS overrides for the Studio platform and bank folder.

Audio longer than the **File Streaming Threshold** (0 to 600 seconds) streams from disk instead of loading into memory.

The surface and dialogue tables are capped at 1 MiB and 8 MiB. Past that, saving logs an error and leaves the old file alone. If saving a very large table seems to do nothing, that's why.

## Testing without a sound card

The engine has headless audio tests that run FMOD in `NOSOUND` mode, with no renderer and no audio device:

```bash
python tests/audio/run.py            # surfaces, music, dialogue, geometry, budgets
python tests/audio/run_managed.py    # the C# audio bindings
python tests/audio/run_sdk_layout.py # checks the SDK layout
```

They need `clang++`, the FMOD SDK, the pinned Asterwave source and `fmodstudiocl`. They copy the sample FMOD project to a temporary folder and never touch the repository.
