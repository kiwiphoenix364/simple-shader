Use as Extension in MakeCode Arcade!

Blocks support not implemented yet!

# Docs
## Functions - Class ShaderPack
1 .get - [static] - get a built in shader, using a string as an argument
"default" is the only current shader built-in
*custom shaders can be made
2 .unpack - unpacks the shader into the format read by the shader layer
3 .getTintIdx - gets the corresponding color of the shader map layer that a shader tint name corresponds to (on a shader that's not unpacked)
## Functions - Class Shader
1 .mapLayer - [public variable] - a 160x120 image that covers the screen, in which you can define which shaders are applied where. Any function that draws to an image will work here. Color 0 is no shader, color 1 is the first tint in the shader pack, color 2 is the second, etc.
2 .setNewShader - sets a new shader (input not unpacked)
3 .directSetUnpackedShader - sets a new already unpacked shader (from .unpack)
## Custom Shaders
Each shader pack is made up of 2 parts - the tint name array and the tint packs array. They are respective, meaning the first name will correspond to the first of the other array, etc. The tint name array is an array of strings that correspond to the tint packs. The tint pack array is an array of number arrays. Each number array in the tint packs array consists of 16 numbers. The number arrays are in order of corresponding screen colors, meaning the first slot ([0]) will correspond to color 0, the fifth slot ([4]) will correspond to color 4, etc. The 0 slot in the number arrays should be 0.
