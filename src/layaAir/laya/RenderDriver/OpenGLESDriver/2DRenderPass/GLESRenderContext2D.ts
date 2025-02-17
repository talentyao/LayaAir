import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { Color } from "../../../maths/Color";
import { IRenderContext2D } from "../../DriverDesign/2DRenderPass/IRenderContext2D";
import { GLESInternalRT } from "../RenderDevice/GLESInternalRT";
import { GLESREnderElement2D } from "./GLESRenderElement2D";

export class GLESREnderContext2D implements IRenderContext2D {
    public get invertY(): boolean {
        return this._nativeObj.invertY;
    }
    public set invertY(value: boolean) {
        this._nativeObj.invertY = value;
    }
    public get pipelineMode(): string {
        return this._nativeObj.pipelineMode;
    }
    public set pipelineMode(value: string) {
        this._nativeObj.pipelineMode = value;
    }

    _nativeObj: any;

    constructor() {
        this._nativeObj = new (window as any).conchGLESRenderContext2D();
        this._nativeObj.setGlobalConfigShaderData((Shader3D._configDefineValues as any)._nativeObj);
        this._nativeObj.pipelineMode = "Forward";
    }
    setRenderTarget(value: GLESInternalRT, clear: boolean, clearColor: Color): void {
        this._nativeObj.setRenderTarget(value?value._nativeObj:null, clear, clearColor);
    }
    setOffscreenView(width: number, height: number): void {
        this._nativeObj.setOffscreenView(width, height);
    }
    drawRenderElementOne(node: GLESREnderElement2D): void {
        this._nativeObj.drawRenderElementOne(node._nativeObj);
    }

}