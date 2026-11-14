# Scenes, prefabs and physics

## Scenes

A scene is a set of entities stored in an [EnTT](https://github.com/skypjack/entt) registry. Each entity has a transform and whatever components you add: a mesh, a light, a camera, a rigid body, a script, an audio source. Entities nest into a hierarchy, and you can group them in folders, which exist only to keep the hierarchy tidy.

Scenes save as YAML, so a scene file is readable text and diffs reasonably in Git. The editor can Play, Simulate and Stop a scene; see [Edit, Play and Simulate](editor.md#edit-play-and-simulate). Play always runs a copy, so stopping puts the scene back exactly as it was.

## Prefabs

A prefab is a saved entity, with its children and components, that you can place many times. Change the prefab and every placed copy picks up the change.

Prefabs can have **variants**: a prefab based on another, which keeps its own per-component overrides. A placed copy can also override individual components. From an override you can **revert** to the prefab's value or **apply** it back to the prefab, and applied changes propagate to the other copies.

The 2027.1 plan lists prefab structural sync among the features that are built but haven't been driven in the editor yet (the M1 hardening pass on the [project board](https://github.com/orgs/starbounded-dev/projects/3)). If a structural change to a prefab doesn't reach its copies, that's a known gap worth reporting.

## 3D physics with Jolt

3D physics runs on [Jolt Physics](https://github.com/jrouwe/JoltPhysics).

| What | Details |
| --- | --- |
| Rigid bodies | Static, dynamic and kinematic bodies, with mass, velocities, gravity and sleep. Scripts can push them with forces and torque; see [Scripting](scripting.md#what-you-can-reach). |
| Colliders | Box, sphere, capsule, mesh and compound. Mesh colliders are cooked once and cached, so a big level doesn't re-cook every time you press Play. |
| Character controller | A controller for player-style movement on top of Jolt. |
| Layers | Physics layers, set in **Project Settings**, decide what collides with what. |
| Events | `OnCollisionBegin` and `OnCollisionEnd` reach scripts. Contacts also drive footstep, impact, scrape and roll sounds; see [Audio](audio.md). |

Mesh colliders do double duty: the acoustics use them as the level's geometry, along with their acoustic material. A wall without a collider is invisible to the audio.

**Simulate** in the editor runs physics without scripts, which is the quickest way to check how a stack of bodies settles.

## 2D physics with Box2D

2D physics runs on [Box2D](https://box2d.org/), with rigid bodies and **box and circle colliders only**. 2D is a renderer more than a toolset today: sprites, circles, lines and text draw fine, but there are no tilemaps or 2D-specific editor tools yet.

## What's missing

- **No joints**, in 3D or 2D: no hinges, sliders, springs or fixed joints.
- **No physics queries from C#.** The engine has raycasts, shape casts and overlaps in C++, but scripts can't call them yet.
- **No vehicles, soft bodies, cloth or ragdolls.**
- **2D is thin**: no polygon, capsule or edge colliders, no tilemap collision, and Box2D steps once per frame rather than on a fixed step.
- **Not yet driven in Play:** the 2027.1 plan lists the character controller and fixed update as built but never run through Play. Treat them as early.

Joints are wanted for 2027.1. Physics queries, full 2D physics (polygon, capsule and edge colliders, tilemap collision, a fixed step) and a 2D project type are must-haves (M4 and M11 on the [project board](https://github.com/orgs/starbounded-dev/projects/3)).
