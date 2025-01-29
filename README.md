Use as Extension in MakeCode Arcade!

Blocks support not implemented yet!

# Docs

## Class ShaderPack

**new ShaderPack(colorNames: string[], shaderColorSets: any[])**\
_colorNames: string[]_\
A string of the names of the tints in shaderColorSets in the same order respectively\
_shaderColorSets: any[]_\
An array of arrays of numbers - each array (tint) contains 16 colors, in the order of the pallete colors respectively. For example, if a given tint's fifth color in the array [4] is set to 9, color 4 will be replaced by color 9 in any area of the shader with that tint. 0 always should correspond to color 0, since that is clear. 15 total tints can be used.

**.destroy()**\
Destroys the ShaderPack - it is easier for garbage collection to clear out

**.get(shader:string) [static function]**\
Get a built in shader, using a string as an argument\
"default" is the only current shader built-in\
*custom shaders can be made

**.getTintIdx(name:string)**\
Gets the corresponding color of the shader map layer that a shader tint name corresponds to (on a Shader that's not unpacked)

**.unpack()**\
Unpacks the Shader into the format read by the shader layer

## Class Shader

**new Shader(currentPack: ShaderPack, refreshShaderLayer: boolean, zValue: number**)\
_currentPack: ShaderPack_\
A ShaderPack that will be decompiled and applied to the Shader\
_refreshShaderLayer: boolean_\
Whether to refresh the shader layer every frame or not\
_zValue: number_\
The Z layer of the Shader (if none is set, it will be automatically set to 0)

**.destroy()**\
Destroys the Shader - any members of ShaderAttachSprite or TileShader applied to this Shader will also be deleted

**.directSetUnpackedShader(shader: Buffer)**\
Sets a new already unpacked Shader (from .unpack)

**.mapLayer [public variable: Image]**\
A 160x120 image that covers the screen, in which you can define which shaders are applied where. Any function that draws to an image will work here. Color 0 is no tint, color 1 is the first tint in the ShaderPack, color 2 is the second, etc.

**.refreshShaderLayer [public variable: boolean]**\
Whether to refresh the shader layer every frame (bool)

**.setNewShader(shader: ShaderPack)**\
Unpacks a ShaderPack and sets it (input not unpacked)

**.toScreenX(x: number) [static function]**\
Takes in an X coordinate (x) and transforms it to the X coordinate it is on the camera - this is a useful util for shaders as they are relative to the screen

**.toScreenY(y: number) [static function]**\
Takes in a Y coordinate (y) and transforms it to the Y coordinate it is on the camera - this is a useful util for shaders as they are relative to the screen

## Class ShaderAttachSprite

**new ShaderAttachSprite(sprite: Sprite, shader: Shader, tint: number, radius: number, flux: number, smoothness: number)**\
_sprite: Sprite_\
The sprite to attach the circle to\
_shader: Shader_\
The Shader that the ShaderAttachSprite is assigned to\
_tint: number_\
The tint (of the assigned ShaderPack) to draw the circle with\
_radius: number_\
The radius of the circle\
_flux: number_\
How much the circle fluctuates\
_smoothness: number_\
How slowly the circle can expand and contract\

**.destroy()**\
Destroys the ShaderAttachSprite

**.flux [public variable: number]**\
How much the circle fluctuates

**.radius [public variable: number]**\
The radius of the circle

**.shader [public variable: Shader]**\
The Shader that the ShaderAttachSprite is assigned to

**.smoothness [public variable: number]**\
How slowly the circle can expand and contract

**.sprite [public variable: Sprite]**\
The sprite to attach the circle to

**.tint [public variable: number]**\
The tint (of the assigned ShaderPack) to draw the circle with

**.xOffset [public variable: number]**\
How much to offset the circle on the X axis

**.yOffset [public variable: number]**\
How much to offset the circle on the Y axis

## Class TileShader

**new TileShader(image: Image, shader: Shader, x: number, y: number)**\
_image_\
Image that will be drawn to the Shader that the TileShader is assigned to\
_shader_\
The Shader that the TileShader is assigned to\
_x_\
The X value that the TileShader will be at (in the normal coordinate system, not relative to camera)\
_y_\
The Y value that the TileShader will be at (in the normal coordinate system, not relative to camera)

**.destroy()**\
Destroys the TileShader

**.image [public variable: Image]**\
Image that will be drawn to the Shader that the TileShader is assigned to

**.shader [public variable: Shader]**\
The Shader that the TileShader is assigned to

**.setBottom(bottom:number)**\
Sets the Bottom value of the TileShader

**.setLeft(left:number)**\
Sets the Left value of the TileShader

**.setPos(x:number, y: number)**\
Sets the X and Y values of the TileShader

**.setRight(right:number)**\
Sets the Right value of the TileShader

**.setTop(top:number)**\
Sets the Top value of the TileShader

**.setX(x:number)**\
Sets the X value of the TileShader

**.setY(y:number)**\
Sets the X value of the TileShader
