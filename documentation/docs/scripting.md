# Scripting in C#

Game logic in LuxEngine is written in C#. Scripts run on **.NET 10**, hosted inside the engine by [Coral](https://github.com/StudioCherno/Coral). The API lives in the `Lux` namespace, in the engine's `ScriptCore` project. Everything on this page was checked against `ScriptCore/Source/Lux/` on [`feature/lucky-merge`](https://github.com/starbounded-dev/LuxEngine/tree/feature/lucky-merge), the newest work, which is on its way into `dev` through pull request 36. On `dev` today, scripting is still on .NET 9 and some of the calls below don't exist yet.

The scripting API is still partial. Read [what's missing](#whats-missing) before you plan a game around it.

## A first script

A script is a class that derives from `Lux.Entity`. Attach it to an entity with a script component, and the engine calls its methods while the scene plays.

```csharp
using Lux;

namespace MyGame
{
    public class Mover : Entity
    {
        [Header("Movement")]
        [Range(0.0f, 20.0f)]
        [Tooltip("Units per second")]
        public float Speed = 3.0f;

        public Sound Bump;   // assign in the inspector

        void OnCreate()
        {
            Log.Info("Mover ready on " + Name);
        }

        void OnUpdate(float ts)
        {
            if (Input.IsKeyDown(KeyCode.W))
                Translation = Translation + new Vector3(0.0f, 0.0f, -Speed * ts);

            if (Input.IsKeyPressed(KeyCode.Escape))
                Application.Quit();
        }

        protected override void OnCollisionBegin(Entity other)
        {
            Audio.PlayOneShot(Bump, Translation);
            Log.Info(Name + " hit " + other.Name);
        }
    }
}
```

The lifecycle methods are found **by name**, not by overriding, so they can be private:

| Method | When it runs |
| --- | --- |
| `void OnCreate()` | Once, when the entity starts or is spawned. |
| `void OnUpdate(float ts)` | Every frame. `ts` is the frame time in seconds. |
| `void OnFixedUpdate(float dt)` | Before every 3D physics step, with the fixed timestep. Put physics code here. |
| `void OnDestroy()` | When the entity goes away. |

The collision and trigger hooks are virtual, so you **override** them: `OnCollisionBegin`, `OnCollisionEnd`, `OnTriggerBegin` and `OnTriggerEnd`, each taking the other `Entity`.

Inspector fields:

- Public fields show up in the inspector. `[Range(min, max)]`, `[Header("text")]` and `[Tooltip("text")]` shape how they're drawn, and `[ShowInEditor]` exposes a non-public field.
- A field of type `Entity` is saved as the entity's ID and reconnected when the script is created, so you can drag one entity onto another's script.
- Asset fields work the same way: `Sound`, `SoundBank`, `Prefab`, `Mesh`, `StaticMesh`, `Material`, `Texture2D` and `Scene`.

The editor can start a new script from a named template, and the sample project's `Editor/LuxSampleProject/Assets/Scripts/Source/` has complete examples. `SlidingDoor` is a good one to read: it slides a door panel and opens an Audio Portal by the same amount, so the door sounds open exactly when it looks open.

## Hot reload

Press **Ctrl+R** in the editor, or use **Edit → Reload C# Assembly**, to rebuild and reload your scripts without restarting. Their stored field values are synchronised again after the reload.

## What you can reach

**Entities.** `Name`, `Translation`, `Rotation`, `Scale`, `Parent` and `Children`; `HasComponent<T>()`, `GetComponent<T>()`, `AddComponent<T>()` and `RemoveComponent<T>()`; `FindEntityByName(name)`; and `As<T>()` to get another entity's script. Create and remove entities with `Entity.Create(name)`, `Entity.Instantiate(prefab)` (optionally with a position and rotation) and `Destroy()`.

**Components with a C# class:** Transform, Tag, Camera, Sprite Renderer, Circle Renderer, Text, Rigid Body, Character Controller, the Box, Sphere, Capsule and Mesh colliders, the 2D Rigid Body and Box and Circle colliders, and the Audio Source, Listener, Zone, Portal and Surface components.

**Rigid bodies.** `LinearVelocity`, `AngularVelocity`, `Mass`, `AddForce` (optionally at a point, with a `ForceMode`), `AddTorque`, `SetGravityEnabled`, `SetSleepState` and `IsSleeping`.

**Input.** Keys and mouse buttons through `IsKeyDown`, `IsKeyPressed`, `IsKeyHeld` and `IsKeyReleased` and the mouse equivalents. Gamepads through `IsGamepadButtonDown` and friends, plus controller axes. Cursor modes, and DualSense trigger effects (resistance, weapon and vibration).

**Audio.** `Audio.PlayOneShot(sound)` or `Audio.PlayOneShot(sound, position)` for fire-and-forget sounds; `Audio.CreateInstance(sound)` for one you control; `LoadBank` and `UnloadBank`; bus volumes, mutes, VCAs, global parameters and snapshots; and `PlayFootstep` for the right footstep on the surface under a character. `Music`, `Dialogue` and `Accessibility` drive the music director, dialogue lines and player audio settings. See [Audio](audio.md).

**Debug drawing.** `Gizmos.DrawLine`, `DrawRay`, `DrawWireBox` and `DrawWireSphere`, with a colour, an optional duration and depth testing.

**The application.** `Application.Quit()` ends the game.

**Logging.** `Log.Trace`, `Log.Info`, `Log.Warn` and `Log.Error`, which land in the editor's Log panel.

**Vectors.** `Vector2`, `Vector3` and `Vector4`.

The editor's **Help** panel (F1) has a generated API reference with a page per type.

## What's missing

As of November 2026:

- **No physics queries.** You can push rigid bodies around, but there's no raycast, shape cast or overlap test from C#. The engine has them in C++; they aren't bound yet.
- **No renderer API.** Scripts can't change lights, materials or post-processing.
- **No scene loading.** Scripts can create, spawn and destroy entities, but can't load, unload or switch scenes.
- **Few maths types.** There's no `Quaternion`, `Mathf` or `Time` class yet. Use `System.MathF` meanwhile.
- **No step debugger** for scripts inside the editor.

All of these except the debugger are planned for 2027.1 under must-have M4, "C# API completion", on the [project board](https://github.com/orgs/starbounded-dev/projects/3).

## Building the script project

The sample project's `.csproj` is generated, not committed. `Setup.bat` and `Linux-Build.sh` generate it for you. If the editor says it can't find the script project, rerun them, or run `Editor/LuxSampleProject/Assets/Scripts/Linux-GenProjects.sh` on Linux.

Install the **.NET 10 SDK**. With an older .NET, the editor stops at startup with a `hostfxr` or "runtime not found" error. See [Troubleshooting](troubleshooting.md).
