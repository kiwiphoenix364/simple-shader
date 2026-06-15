class ShaderBlocks {

}
class ShaderPack {
    private colorNames: string[]
    private shaderColorSets: number[][]
    constructor(colorNames: string[], shaderColorSets: any[]) {
        this.colorNames = colorNames
        this.shaderColorSets = shaderColorSets
    }
    public unpack() {
        //let buf = Buffer.create(16)
        //for (let i = 0; i < this.shaderColorSets.length; i++) {
        //    buf = buf.concat(this.shaderColorSets[i])
        //}
        let buf: Buffer = Buffer.fromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
        for (let i = 0; i < this.shaderColorSets.length; i++) {
            buf = buf.concat(Buffer.fromArray(this.shaderColorSets[i]))
        }
        return buf
    }
    public getTintIdx(name: string) {
        return this.colorNames.indexOf(name) + 1
    }
    public getShaderShade(name: string) {
        return Buffer.fromArray(this.shaderColorSets[this.colorNames.indexOf(name)])
    }
    public destroy() {
        this.colorNames = this.shaderColorSets = null
    }
    static get(shader: string) {
        //reference for shader pack format
        //color sets and color set names are in respective orders in their arrays
        //shader arrays go in order of colors on the screen, so the fifth item in the array ([4]) will be color four
        let packNames = ["default"]
        let packs = [
            new ShaderPack(
                ["light", "light2", "dark", "dark2", "yellow", "yellow2", "red", "green", "blue", "purple"],
                [
                    [0, 1, 4, 1, 5, 1, 7, 5, 9, 1, 11, 1, 10, 1, 2, 12],
                    [0, 1, 5, 1, 1, 1, 5, 1, 1, 1, 1, 1, 11, 1, 4, 10],
                    [0, 13, 14, 2, 2, 7, 8, 6, 12, 6, 12, 12, 15, 14, 15, 15],
                    [0, 14, 15, 14, 14, 6, 12, 8, 15, 8, 15, 15, 15, 15, 15, 15],
                    [0, 13, 4, 4, 5, 5, 7, 5, 6, 13, 11, 13, 11, 5, 13, 14],
                    [0, 5, 5, 5, 5, 5, 5, 5, 7, 5, 13, 5, 13, 5, 5, 13],
                    [0, 3, 2, 2, 2, 4, 11, 4, 10, 11, 2, 2, 10, 4, 2, 14],
                    [0, 5, 4, 13, 5, 7, 7, 7, 6, 6, 12, 7, 7, 7, 5, 8],
                    [0, 9, 10, 11, 12, 6, 8, 6, 8, 8, 12, 8, 8, 9, 12, 8],
                    [0, 11, 10, 10, 11, 4, 10, 12, 10, 11, 10, 10, 10, 11, 12, 12]
                ]
            )
        ]

        //for generating the "2" varients
        //let test = []
        //let sample = [0, 1, 4, 1, 5, 1, 7, 5, 9, 1, 11, 1, 10, 1, 2, 12]
        //for (let j = 0; j < 16; j++) {
        //    test.push(sample[sample[j]])
        //}
        return packs[packNames.indexOf(shader)]
    }
}
class Shader {
    //Declare initial variables
    //lookup table
    //lkupx16: Buffer
    //Shader pack
    public refreshShaderLayer: boolean
    protected currentPack: ShaderPack
    //Decompiled shader pack
    protected decompShader: Buffer
    //Shader augment image
    public mapLayer: Image
    //zValue
    protected zValue: number
    //Renderable for shader
    private shader: scene.Renderable
    protected updater: control.FrameCallback
    constructor(currentPack: ShaderPack, refreshShaderLayer: boolean, zValue = 0) {
        /*
        //build lookup table
        this.lkupx16 = Buffer.create(16)
        for (let i = 0; i < 16; i++) {
            this.lkupx16[i] = (i * 16)
        }
        */
        this.refreshShaderLayer = refreshShaderLayer
        this.zValue = zValue
        this.currentPack = currentPack
        //Unpack Shaderpack
        this.decompShader = this.currentPack.unpack()
        //create buffer image
        this.mapLayer = image.create(scene.screenWidth(), scene.screenHeight())
        this.runShader()
        this.updateShaderLayer()
    }
    protected runShader() {
        this.shader = scene.createRenderable(this.zValue, (screenImg: Image, camera: scene.Camera) => {
            this.shadeImg(screenImg)
        })
    }
    protected shadeImg(img: Image) {
        let shaderBuf = Buffer.create(Math.imul(img.width, img.height))
        let renderBuf = Buffer.create(Math.imul(img.width, img.height))
        let decompShader = Buffer.create(0).concat(this.decompShader)
        img.getRows(0, renderBuf)
        this.mapLayer.getRows(0, shaderBuf)
        let x = Math.imul(img.width, img.height)
        let y = 0
        while (y < x) {
            renderBuf[y] = decompShader[renderBuf[y] | shaderBuf[y] << 4];
            //this.renderBuf[y] = this.decompShader[this.renderBuf[y]];
            //this.renderBuf[x] = this.decompShader[this.renderBuf[x] | this.shaderBuf[x] << 4];
            //this.shaderBuf[x] ? this.renderBuf[x] = this.decompShader[this.renderBuf[x] | this.shaderBuf[x] << 4] : null;
            //use alternate compilation format
            //this.renderBuf[y] = (this.decompShader[this.renderBuf[y] + Math.imul(this.shaderBuf[y], 16)])
            //alt comp format + lookup table
            //this.renderBuf[y] = (this.decompShader[this.renderBuf[y] + this.lkupx16[this.shaderBuf[y]]])
            y++
        }
        img.setRows(0, renderBuf)
    }
    protected updateShaderLayer() {
        this.updater = game.currentScene().eventContext.registerFrameHandler(17, () => {
            if (this.refreshShaderLayer === true) {
                this.mapLayer.fill(0)
            }
        })
    }
    public setNewShader(shader: ShaderPack) {
        this.decompShader = shader.unpack()
    }
    /*
    //alt function
    directSetUnpackedShader(array: Buffer) {
        this.decompShader = shader
    }
    */
    public directSetUnpackedShader(shader: Buffer) {
        this.decompShader = shader
    }
    static toScreenX(x: number) {
        return x - scene.cameraProperty(CameraProperty.Left)
    }
    static toScreenY(y: number) {
        return y - scene.cameraProperty(CameraProperty.Top)
    }
    public destroy() {
        this.shader.destroy()
        game.currentScene().eventContext.unregisterFrameHandler(this.updater)
        this.refreshShaderLayer = this.currentPack = this.decompShader = this.mapLayer = this.zValue = this.updater = null
    }
}
class ShaderAttachSprite {
    public sprite: Sprite
    public image: Image
    public shader: Shader | LiteShader
    public mapLayer: Image
    public xOffset: number
    public yOffset: number
    protected x: number
    protected y: number
    protected left: number
    protected top: number
    protected right: number
    protected bottom: number
    protected updater: control.FrameCallback
    protected lite: boolean
    protected l2: boolean
    constructor(shader: Shader | LiteShader, sprite: Sprite, image: Image, xOffset = 0, yOffset = 0, liteShader = false, layer2 = false) {
        this.sprite = sprite
        this.xOffset = xOffset
        this.yOffset = yOffset
        // Yes, a proper example of an assignment if in the wild
        if (this.lite = liteShader) {
            this.shader = shader
            if (this.l2 = layer2)  {
                this.mapLayer = (shader as LiteShaderX2).mapLayer2
                image.replace(1, (shader as LiteShaderX2).unusedColor2)
                this.image = image
            } else {
                this.mapLayer = shader.mapLayer
                image.replace(1, (shader as LiteShader).unusedColor)
                this.image = image
            }
        } else {
            this.mapLayer = shader.mapLayer
        }
        this.updateShaderPos()
        this.sprite.onDestroyed(() => {
            this.destroy()
        })
    }
    protected updateShaderPos() {
            this.updater = game.currentScene().eventContext.registerFrameHandler(24, () => {
                this.updateFunction()
            })
    }
    protected updateFunction() {
        this.x = this.sprite.x + this.xOffset
        this.y = this.sprite.y + this.yOffset
        this.left = this.x - (this.image.width >> 1)
        this.top = this.y - (this.image.height >> 1)
        this.right = this.left + this.image.width
        this.bottom = this.top + this.image.height
        if (this.mapLayer === null) {
            this.destroy()
            return
        }
        if (Shader.toScreenX(this.left) < scene.screenWidth() && Shader.toScreenX(this.right) > 0 && Shader.toScreenY(this.top) < scene.screenHeight() && Shader.toScreenY(this.bottom) > 0) {
            this.mapLayer.drawTransparentImage(this.image, Shader.toScreenX(this.left), Shader.toScreenY(this.top))
            //helpers.imageBlit(this.shader.mapLayer, Shader.toScreenX(this.left), Shader.toScreenY(this.top), this.image.width, this.image.height, this.image, 0, 0, this.image.width, this.image.height, true, false)
        }
    }
    public setImage(img: Image) {
        this.image = img
    }
    public setImageLite(img: Image) {
        if (this.l2)
            img.replace(1, (this.shader as LiteShaderX2).unusedColor2)
        else
            img.replace(1, (this.shader as LiteShader).unusedColor)
        this.image = img
    }
    public setImageSafe(img: Image) {
        if (this.lite) {
            if (this.l2)
                img.replace(1, (this.shader as LiteShaderX2).unusedColor2)
            else
                img.replace(1, (this.shader as LiteShader).unusedColor)
        }
        this.image = img
    }
    public destroy() {
        game.currentScene().eventContext.unregisterFrameHandler(this.updater)
        this.mapLayer = this.sprite = this.image = this.x = this.y = this.left = this.top = this.right = this.bottom = this.xOffset = this.yOffset = this.updater = this.lite = this.l2 = null
    }
}
class CircleShaderAttachSprite {
    public sprite: Sprite
    public shader: Shader | LiteShader
    public mapLayer: Image
    public tint: number
    public radius: number
    private currentRad: number
    public flux: number
    public smoothness: number
    public xOffset: number
    public yOffset: number
    protected updater: control.FrameCallback
    protected lite: boolean
    protected l2: boolean
    constructor(shader: Shader | LiteShader, sprite: Sprite, xOffset = 0, yOffset = 0, tint = 1, radius = 5, flux = 0, smoothness = 1, liteShader = false, layer2 = false) {
        this.sprite = sprite
        this.xOffset = xOffset
        this.yOffset = yOffset
        if (this.lite = liteShader) {
            this.shader = shader
            if (this.l2 = layer2) {
                this.mapLayer = (shader as LiteShaderX2).mapLayer2
            } else {
                this.mapLayer = shader.mapLayer
            }
        } else {
            this.mapLayer = shader.mapLayer
        }
        this.tint = tint
        this.radius = radius
        this.currentRad = this.radius
        this.flux = flux
        this.smoothness = smoothness
        this.updateLightSource()
        this.sprite.onDestroyed(() => {
            this.destroy()
        })
    }
    public setTint(tint: number) {
        this.tint = tint
    }
    public setTintLite() {
        if (this.l2)
            this.tint = (this.shader as LiteShaderX2).unusedColor2
        else
            this.tint = (this.shader as LiteShader).unusedColor
    }
    public setTintSafe(tint: number) {
        this.tint = tint
        if (this.lite) {
            if (this.l2)
                this.tint = (this.shader as LiteShaderX2).unusedColor2
            else
                this.tint = (this.shader as LiteShader).unusedColor
        } else {
            this.tint = tint
        }
    }
    protected updateLightSource() {
        this.updateFunction()
    }
    protected updateFunction() {
        this.updater = game.currentScene().eventContext.registerFrameHandler(24, () => {
            if (this.shader.mapLayer === null) {
                this.destroy()
                return
            }
            if (Shader.toScreenX(this.sprite.x - this.currentRad + this.xOffset) < scene.screenWidth() && Shader.toScreenX(this.sprite.x + this.currentRad + this.xOffset) > 0 && Shader.toScreenY(this.sprite.y - this.currentRad + this.yOffset) < scene.screenHeight() && Shader.toScreenY(this.sprite.y + this.currentRad + this.yOffset) > 0) {
                if (this.smoothness != 0) {
                    this.updateFlux()
                }
                this.mapLayer.fillCircle(Shader.toScreenX(this.sprite.x) + this.xOffset, Shader.toScreenY(this.sprite.y) + this.yOffset, Math.round(this.currentRad), this.tint)
            }
        })
    }
    protected updateFlux() {
        this.smoothness = Math.constrain(this.smoothness, Math.abs(this.flux) * -2, Math.abs(this.flux) * 2)
        this.currentRad += Math.randomRange(0 - this.smoothness, this.smoothness)
        //this.currentRad = Math.constrain(this.currentRad, this.radius + this.flux, this.radius - this.flux)
        if (this.currentRad > this.radius + this.flux || this.currentRad < this.radius - this.flux) {
            this.currentRad -= this.currentRad - (this.radius + this.flux)
        }
    }
    public destroy() {
        game.currentScene().eventContext.unregisterFrameHandler(this.updater)
        this.shader = this.sprite = this.tint = this.radius = this.currentRad = this.flux = this.smoothness = this.xOffset = this.yOffset = this.updater = this.lite = this.l2 = this.mapLayer = null
    }
}
class TileShader {
    public shader: Shader | LiteShader
    public mapLayer: Image
    public image: Image
    protected x: number
    protected y: number
    protected left: number
    protected top: number
    protected right: number
    protected bottom: number
    protected updater: control.FrameCallback
    protected lite: boolean
    protected l2: boolean
    constructor(shader: Shader | LiteShader, image: Image, x: number, y: number, liteShader = false, layer2 = false) {
        this.image = image
        this.x = x
        this.y = y
        if (this.lite = liteShader) {
            this.shader = shader
            if (this.l2 = layer2) {
                this.mapLayer = (shader as LiteShaderX2).mapLayer2
            } else {
                this.mapLayer = shader.mapLayer
            }
        } else {
            this.mapLayer = shader.mapLayer
        }
        this.left = this.x - this.image.width >> 1
        this.top = this.y - this.image.height >> 1
        this.right = this.left + this.image.width
        this.bottom = this.top + this.image.height
        this.updateTile()
    }
    public setX(x: number) {
        this.x = x
        this.left = this.x - (this.image.width >> 1)
        this.right = this.left + this.image.width
    }
    public setY(y: number) {
        this.y = y
        this.top = this.y - (this.image.height >> 1)
        this.bottom = this.top + this.image.height
    }
    public setPos(x: number, y: number) {
        this.x = x
        this.left = this.x - (this.image.width >> 1)
        this.right = this.left + this.image.width
        this.y = y
        this.top = this.y - (this.image.height >> 1)
        this.bottom = this.top + this.image.height
    }
    public setLeft(left: number) {
        this.left = left
        this.x = this.left + (this.image.width >> 1)
        this.right = this.left + this.image.width
    }
    public setTop(top: number) {
        this.top = top
        this.y = this.top + (this.image.height >> 1)
        this.bottom = this.top + this.image.height
    }
    public setRight(right: number) {
        this.right = right
        this.left = this.right - this.image.width
        this.x = this.left + (this.image.width >> 1)
    }
    public setBottom(bottom: number) {
        this.bottom = bottom
        this.top = this.bottom - this.image.height
        this.y = this.top + (this.image.height >> 1)
    }
    protected updateTile() {
        this.updater = game.currentScene().eventContext.registerFrameHandler(23, () => {
            this.updateFunction()
        })
    }
    protected updateFunction() {
        if (this.shader.mapLayer === null) {
            this.destroy()
            return
        }
        if (Shader.toScreenX(this.left) < scene.screenWidth() && Shader.toScreenX(this.right) > 0 && Shader.toScreenY(this.top) < scene.screenHeight() && Shader.toScreenY(this.bottom) > 0) {
            this.mapLayer.drawTransparentImage(this.image, Shader.toScreenX(this.left), Shader.toScreenY(this.top))
            //helpers.imageBlit(this.shader.mapLayer, Shader.toScreenX(this.left), Shader.toScreenY(this.top), this.image.width, this.image.height, this.image, 0, 0, this.image.width, this.image.height, true, false)
        }
    }
    public setImage(img: Image) {
        this.image = img
    }
    public setImageLite(img: Image) {
        if (this.l2)
            img.replace(1, (this.shader as LiteShaderX2).unusedColor2)
        else
            img.replace(1, (this.shader as LiteShader).unusedColor)
        this.image = img
    }
    public setImageSafe(img: Image) {
        if (this.lite) {
            if (this.l2)
                img.replace(1, (this.shader as LiteShaderX2).unusedColor2)
            else
                img.replace(1, (this.shader as LiteShader).unusedColor)
        }
        this.image = img
    }
    public destroy() {
        game.currentScene().eventContext.unregisterFrameHandler(this.updater)
        this.shader = this.image = this.x = this.y = this.left = this.top = this.right = this.bottom = this.updater = this.lite = this.l2 = this.mapLayer = null
    }
}
class LiteShader {
    //Declare initial variables
    //Shader pack
    public refreshShaderLayer: boolean
    //Shader augment image
    public mapLayer: Image
    //zValue
    protected zValue: number
    //Renderable for shader
    public shade: Buffer
    protected shader: scene.Renderable
    protected updater: control.FrameCallback
    public unusedColor: number
    constructor(singleShade: Buffer, refreshShaderLayer = true, zValue = 0) {
        this.refreshShaderLayer = refreshShaderLayer
        this.zValue = zValue
        this.shade = singleShade
        //create buffer image
        this.mapLayer = image.create(scene.screenWidth(), scene.screenHeight())
        this.runShader()
        this.updateShaderLayer()
        this.setUnusedColor()
    }
    protected runShader() {
        this.shader = scene.createRenderable(this.zValue, (screenImg: Image, camera: scene.Camera) => {
            this.shadeImg(screenImg)
        })
    }
    protected shadeImg(img: Image) {
        let tempImg = image.create(scene.screenWidth(), scene.screenHeight())
        tempImg.copyFrom(img)
        tempImg.drawTransparentImage(this.mapLayer, 0, 0)
        tempImg.replace(this.unusedColor, 0)
        img.mapRect(0, 0, scene.screenWidth(), scene.screenHeight(), this.shade)
        img.drawTransparentImage(tempImg, 0, 0)
    }
    protected updateShaderLayer() {
        this.updater = game.currentScene().eventContext.registerFrameHandler(17, () => {
            if (this.refreshShaderLayer === true) {
                this.mapLayer.fill(0)
            }
        })
    }
    public setMapLayer(mapLayer: Image) {
        this.mapLayer = mapLayer
        this.mapLayer.replace(1, this.unusedColor)
    }
    public setNewShade(shade: Buffer) {
        this.shade = shade
        this.setUnusedColor()
    }
    static toScreenX(x: number) {
        return x - scene.cameraProperty(CameraProperty.Left)
    }
    static toScreenY(y: number) {
        return y - scene.cameraProperty(CameraProperty.Top)
    }
    public setUnusedColor() {
        this.unusedColor = 15
        /*
        for (let i = 1; i < 16; i++) {
            this.shade.toArray(NumberFormat.Int8LE).indexOf(i) == -1 ? this.unusedColor = i : null;
        }
        */
        for (let i = 1; i < 16; i++) {
            this.shade[i] == i ? this.unusedColor = i : null;
        }
        return this.unusedColor
    }
    public destroy() {
        this.shader.destroy()
        game.currentScene().eventContext.unregisterFrameHandler(this.updater)
        this.refreshShaderLayer = this.mapLayer = this.zValue = this.updater = this.shade = this.unusedColor = null
    }
}
class LiteShaderX2 extends LiteShader {
    public mapLayer2: Image
    public shade2: Buffer
    public unusedColor2: number
    public refreshShaderLayer2: boolean
    constructor(singleShade: Buffer, secondShade: Buffer, refreshShaderLayer = true, refreshShaderLayer2 = true, zValue = 0) {
        super(singleShade, refreshShaderLayer, zValue)
        this.shade2 = secondShade
        this.refreshShaderLayer2 = refreshShaderLayer
        //create buffer image
        this.mapLayer2 = image.create(scene.screenWidth(), scene.screenHeight())
        this.setUnusedColor2()
        this.updateShaderLayer()
    }
    protected runShader() {
        this.shader = scene.createRenderable(this.zValue, (screenImg: Image, camera: scene.Camera) => {
            this.shadeImg(screenImg)
        })
    }
    protected shadeImg(img: Image) {
        let tempImg = image.create(scene.screenWidth(), scene.screenHeight())
        tempImg.copyFrom(img)
        tempImg.drawTransparentImage(this.mapLayer, 0, 0)
        tempImg.replace(this.unusedColor, 0)
        img.mapRect(0, 0, scene.screenWidth(), scene.screenHeight(), this.shade)
        img.drawTransparentImage(tempImg, 0, 0)

        tempImg.copyFrom(img)
        tempImg.drawTransparentImage(this.mapLayer2, 0, 0)
        tempImg.replace(this.unusedColor2, 0)
        img.mapRect(0, 0, scene.screenWidth(), scene.screenHeight(), this.shade2)
        img.drawTransparentImage(tempImg, 0, 0)

    }
    protected updateShaderLayer() {
        this.updater = game.currentScene().eventContext.registerFrameHandler(17, () => {
            if (this.refreshShaderLayer === true) {
                this.mapLayer.fill(0)
            }
            if (this.refreshShaderLayer2 === true) {
                this.mapLayer2.fill(0)
            }
        })
    }
    public setMapLayer2(mapLayer: Image) {
        this.mapLayer2 = mapLayer
        this.mapLayer2.replace(1, this.unusedColor2)
    }
    public setNewShade2(shade2: Buffer) {
        this.shade2 = shade2
        this.setUnusedColor2()
    }
    public setUnusedColor2() {
        this.unusedColor2 = 15
        /*
        for (let i = 1; i < 16; i++) {
            this.shade2.toArray(NumberFormat.Int8LE).indexOf(i) == -1 ? this.unusedColor2 = i : null;
        }
        */
        for (let i = 1; i < 16; i++) {
            this.shade2[i] == i ? this.unusedColor2 = i : null;
        }
        return this.unusedColor2
    }
    public destroy() {
        this.shader.destroy()
        game.currentScene().eventContext.unregisterFrameHandler(this.updater)
        this.refreshShaderLayer = this.refreshShaderLayer2 = this.unusedColor2 = this.mapLayer2 = this.mapLayer = this.zValue = this.updater = this.shade = this.unusedColor = null
    }
}