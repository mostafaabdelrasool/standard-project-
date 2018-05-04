import { Injectable } from '@angular/core';

@Injectable()
export class AsHtmlService {

    HorizontallyBound(parent, child): ExceedType {
        const parentRect = parent.getBoundingClientRect();
        const childRect = child.getBoundingClientRect();
        if (childRect.left === 0 || childRect.right === 0) {
            return null;
        }
        const boundryType = childRect.right > parentRect.right ? ExceedType.RIGHT :
            childRect.left < parentRect.left ? ExceedType.LEFT : null;
        return boundryType;
    }
    checkItemInView(position, scene) {
        const camera = scene.camera;
        const frustum = camera.frustum;
        const cullingVolume = frustum.computeCullingVolume(camera.position, camera.direction, camera.up);
        return cullingVolume.computeVisibility(new Cesium.BoundingSphere(position, 0.0)) === Cesium.Intersect.INSIDE;
    }

}
export enum ExceedType {
    LEFT, TOP, RIGHT, BOTTON
}
