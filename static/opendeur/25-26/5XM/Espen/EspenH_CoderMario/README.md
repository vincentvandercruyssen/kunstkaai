# Coder Mario - A P5.js & ML5.js Game

## Overview
This is an offbrand Super Mario-style platformer game about a programmer, built with P5.js and powered by camera-based pose detection using ML5.js.

## Features
- **Pose Detection Control**: Use your webcam to move the character by moving your shoulders left/right
- **Jump Mechanic**: Raise your arms up to make the coder jump
- **3 Difficulty Levels**: Progressive levels with more platforms and enemies
- **Programming Theme**: The character is a coder with a laptop on their chest, enemies are "bugs", and platforms are "code blocks"
- **Score System**: Earn points by completing levels

## Game Controls
- **Move Left/Right**: Move your shoulders left and right
  - Move left shoulder further left = Move left
  - Move right shoulder further right = Move right
  - Shoulder position relative to each other controls movement
- **Jump**: Raise both arms/shoulders up quickly
- **Objective**: Reach the top of the screen without hitting bugs or falling

## How to Play
1. Open `index.html` in a web browser
2. Allow camera access when prompted
3. Wait for the pose detection model to load (it will say "Ready! Move to play!")
4. Move your body and arms to control the coder
5. Complete all 3 levels by reaching the top of the screen

## What You'll Encounter
- **Green Platforms**: Code blocks you can jump on
- **Red Circles with X**: Bugs (errors) to avoid
- **Score**: Points accumulate as you complete levels
- **Levels**: Each level introduces more challenges:
  - Level 1: Tutorial with easy platforms
  - Level 2: More platforms and faster bugs
  - Level 3: Complex platforming with many fast bugs

## Technical Stack
- **P5.js**: Game framework and graphics
- **ML5.js**: Machine learning pose detection
- **TensorFlow.js** (via ML5): Neural network for body pose tracking
- **Vanilla JavaScript**: Game logic

## Requirements
- Modern web browser with webcam
- Good lighting for pose detection to work well
- A bit of space to move around

## Tips
- Make sure you have good lighting for the camera
- Stand at a reasonable distance from the camera
- The poses sometimes need a moment to calibrate - be patient
- Smooth, deliberate movements work better than jittery ones
- Jump from one platform to the next to avoid bugs

## Game States
- **Loading**: Model is being loaded from ML5
- **Playing**: Active gameplay
- **Game Over**: Hit a bug or fell off the screen
- **Won**: Completed all 3 levels!

Refresh the page to restart the game.

Enjoy debugging your way to victory! 🐛💻
