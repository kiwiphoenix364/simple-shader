Use as Extension in MakeCode Arcade!

Blocks support not implemented yet!

# Docs (WIP)
## Functions - Class ShaderPack
1. .get - [static] - get a built in shader, using a string as an argument
"default" is the only current shader built-in
*custom shaders can be made
3. .unpack - unpacks the shader into the format read by the shader layer
4. .getTintIdx - gets the corresponding color of the shader map layer that a shader tint name corresponds to (on a shader that's not unpacked)
## Functions - Class Shader
1. .mapLayer - [public variable] - a 160x120 image that covers the screen, in which you can define which shaders are applied where. Any function that draws to an image will work here. Color 0 is no shader, color 1 is the first tint in the shader pack, color 2 is the second, etc.
2. .setNewShader - sets a new shader (input not unpacked)
3. .directSetUnpackedShader - sets a new already unpacked shader (from .unpack)
