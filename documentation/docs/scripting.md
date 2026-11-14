# Scripting in C#

Game logic in LuxEngine is written in C#. Scripts run on **.NET 9**, hosted inside the engine by [Coral](https://github.com/StudioCherno/Coral). The API lives in the `Lux` namespace, in the engine's `ScriptCore` project. Everything on this page was checked against `ScriptCore/Source/Lux/` on the `dev` branch.

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

        void OnCreate()
        {
            Log.Info("Mover ready on " + Name);
        }

        void OnUpdate(float ts)
        {
            if (Input.IsKeyDown(KeyCode.W))
                Translation = Translation + new Vector3(0.0f, 0.0f, -Speed * ts);
        }

        protected override void OnCollisionBegin(Entity other)
        {
            Log.Info(Name + " hit " + other.Name);
        }
    }
}
```

A few things that aren't obvious:

- `OnCreate`, `OnUpdate(float ts)` and `OnDestroy` are found **by name**, not by overriding, so they can be private. `ts` is the frame time in seconds.
- The collision hooks, `OnCollisionBegin(Entity other)` and `OnCollisionEnd(Entity other)`, *are* virtual, so you override them.
- Public fields show up in the inspector. `[Range(min, max)]`, `[Header("text")]` and `[Tooltip("text")]` shape how they're drawn. `[ShowInEditor]` exposes a non-public field.
- A field of type `Entity` is saved as the entity's ID and reconnected when the script is created, so you can drag one entity onto another's script in the inspector.

The sample project's `Editor/LuxSampleProject/Assets/Scripts/Source/` has four complete scripts: `FlyCamera`, `CameraPath`, `FmodAudioDemo` and `SlidingDoor`. `SlidingDoor` is a good one to read. It slides a door panel and opens an Audio Portal by the same amount, so the door sounds open exactly when it looks open.

## Hot reload

Press **Ctrl+R** in the editor, or use **Edit → Reload C# Assembly**, to rebuild and reload your scripts without restarting. Their stored field values are synchronised again after the reload.

## What you can reach

**Entities.** `Name`, `Translation`, `Rotation`, `Scale`, `Parent` and `Children`. `HasComponent<T>()`, `GetComponent<T>()`, `AddComponent<T>()` and `RemoveComponent<T>()`.

**Components with a C# class:** Transform, Tag, Camera, Sprite Renderer, Circle Renderer, Text, Rigid Body, Character Controller, the Box, Sphere, Capsule and Mesh colliders, and the Audio Source, Listener, Zone, Portal and Surface components.

**Rigid bodies.** `LinearVelocity`, `AngularVelocity`, `Mass`, `AddForce` (optionally at a point, with a `ForceMode`), `AddTorque`, `SetGravityEnabled`, `SetSleepState` and `IsSleeping`.

**Input.** Keys and mouse buttons through `IsKeyDown`, `IsKeyPressed`, `IsKeyHeld` and `IsKeyReleased`, and the mouse equivalents. Gamepads through `IsGamepadButtonDown` and friends, plus controller axes. Cursor modes, and DualSense trigger effects (resistance, weapon and vibration).

**Logging.** `Log.Trace`, `Log.Info`, `Log.Warn` and `Log.Error`, which land in the editor's Log panel.

**Audio.** Playing and controlling events, the music director, dialogue lines and accessibility settings, through `Audio`, `Music`, `Dialogue` and `Accessibility`. See [Audio](audio.md) for what each one drives.

**Assets** through `Asset`, and **vectors** through `Vector2`, `Vector3` and `Vector4`.

## What's missing

As of November 2026, on `dev`:

- **No physics queries.** You can push rigid bodies around, but there's no raycast, shape cast or overlap test from C#. The engine has them in C++; they aren't bound yet.
- **No renderer API.** Scripts can't change lights, materials or post-processing.
- **No scene loading.** Scripts can't load, unload or switch scenes.
- **Few maths types.** There are `Vector2`, `Vector3` and `Vector4`, but no `Quaternion`, `Mathf` or `Time` class. Use `System.MathF` meanwhile.
- **No step debugger** for scripts inside the editor.

All of these are planned for 2027.1 under must-have M4, "C# API completion", on the [project board](https://github.com/orgs/starbounded-dev/projects/3). The move to .NET 10 (M7) is done on a branch and lands with that work.

## Building the script project

The sample project's `.csproj` is generated, not committed. `Setup.bat` and `Linux-Build.sh` generate it for you. If the editor says it can't find the script project, rerun them, or run `Editor/LuxSampleProject/Assets/Scripts/Linux-GenProjects.sh` on Linux.

Install **.NET 9** specifically. Coral looks for major version 9, and having .NET 10 installed doesn't satisfy it. See [Troubleshooting](troubleshooting.md).
