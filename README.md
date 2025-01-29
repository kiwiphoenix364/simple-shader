Use as Extension in MakeCode Arcade!

Blocks support not implemented yet!

# Docs

## Class ShaderPack

**Creating a ShaderPack**
new ShaderPack(colorNames: string[], shaderColorSets: any[])
[colorNames]
A string of the names of the tints in shaderColorSets in the same order respectively
[shaderColorSets]
An array of arrays of numbers - each array (tint) contains 16 colors, in the order of the pallete colors respectively. For example, if a given tint's fifth color in the array [4] is set to 9, color 4 will be replaced by color 9 in any area of the shader with that tint. 0 always should correspond to color 0, since that is clear. 15 total tints can be used.

**.destroy()**
Destroys the ShaderPack - it is easier for garbage collection to clear out

**.get(shader:string) [static function]**
Get a built in shader, using a string as an argument
"default" is the only current shader built-in
*custom shaders can be made

**.getTintIdx(name:string)**
Gets the corresponding color of the shader map layer that a shader tint name corresponds to (on a shader that's not unpacked)

**.unpack()**
Unpacks the shader into the format read by the shader layer

## Class Shader

**Creating a Shader**
new Shader(currentPack: ShaderPack, refreshShaderLayer: boolean, zValue: number)
[currentPack]
A shader pack that will be decompiled and applied to the shader
[refreshShaderLayer]
Whether to refresh the shader layer every frame or not
[zValue]
The Z layer of the shader (if none is set, it will be automatically set to 0)

**.destroy()**
Destroys the Shader - any members of ShaderAttachSprite or TileShader applied to this shader will also be deleted

**.directSetUnpackedShader(shader: Buffer)**
Sets a new already unpacked shader (from .unpack)

**.mapLayer [public variable]**
A 160x120 image that covers the screen, in which you can define which shaders are applied where. Any function that draws to an image will work here. Color 0 is no shader, color 1 is the first tint in the shader pack, color 2 is the second, etc.

**refreshShaderLayer [public variable]**
Whether to refresh the shader layer every frame (bool)

**.setNewShader(shader: ShaderPack)**
Unpacks and sets a new shader (input not unpacked)

**.toScreenX(val: number) [static function]**
Takes in an X coordinate (val) and transforms it to the X coordinate it is on the camera - this is a useful util for shaders as they are relative to the screen

**.toScreenY(val: number) [static function]**
Takes in a Y coordinate (val) and transforms it to the Y coordinate it is on the camera - this is a useful util for shaders as they are relative to the screen

## Class ShaderAttachSprite

**Creating a ShaderAttachSprite**
new ShaderAttachSprite(sprite: Sprite, shader: Shader, tint: number, radius: number, flux: number, smoothness: number)
[sprite]
The sprite to attach the shader circle to
[shader]
The shader that the ShaderAttachSprite is assigned to
[tint]
The tint (of the assigned shader pack) to draw the circle with
[radius]
The radius of the circle
[flux]
How much the circle fluctuates
[smoothness]
How slowly the circle can expand and contract

**.destroy()**
Destroys the ShaderAttachSprite

**flux [public variable]**
How much the circle fluctuates

**radius [public variable]**
The radius of the circle

**shader [public variable]**
The shader that the ShaderAttachSprite is assigned to

**smoothness [public variable]**
How slowly the circle can expand and contract

**sprite [public variable]**
The sprite to attach the shader circle to

**tint [public variable]**
The tint (of the assigned shader pack) to draw the circle with

**xOffset [public variable]**
How much to offset the circle on the X axis

**yOffset [public variable]**
How much to offset the circle on the Y axis
