export class PerfTools{
    static begin(block: string){

    }
    static end(block: string){

    }
}

export class PerformanceDefine {
    static SCENE3D_RENDER: string;
    static SCENE3D_RENDERPRE: string;
    static SCENE3D_RENDERCAM: string;
}

export function PERF_BEGIN(block: string): void {
    PerfTools.begin(block);
}

export function PERF_END(block: string): void {
    PerfTools.end(block);
}


export function PERF_STAT(block: string): MethodDecorator {
    return function (target: any, key: string | symbol, descriptor: PropertyDescriptor){
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            const _block = (PerformanceDefine as any)[block];
            if(!_block){
                return originalMethod.apply(this, args);
            }else{
                PerfTools.begin(_block);
                const result = originalMethod.apply(this, args);
                PerfTools.end(_block);
                return result;
            }
        }
        return descriptor;
    }
}
