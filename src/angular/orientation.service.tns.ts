import { Injectable, NgZone, OnDestroy } from "@angular/core";

import * as orientation from '../orientation'
import { BehaviorSubject, Observable } from "rxjs";

export type DeviceOrientation = "portrait" | "landscape" | "landscapeleft" | "landscaperight";

export type OrientationCallback = (orientation: DeviceOrientation) => void;

@Injectable()
export class Orientation implements OnDestroy {

    private orientationObs: BehaviorSubject<string>;
    private addedAppliers: OrientationCallback[];

    constructor(private _zone: NgZone) {
        this.addedAppliers = [];
        this.orientationObs = new BehaviorSubject<string>(orientation.getOrientation());
        orientation.addOrientationApplier(this.applierObserverCallback.bind(this));
        orientation.addOrientationApplier(this.applierWrapperCallback.bind(this));
    }

    ngOnDestroy() {
        orientation.removeOrientationApplier(this.applierObserverCallback);
        orientation.removeOrientationApplier(this.applierWrapperCallback);
    }

    private applierObserverCallback(newOrientation: any) {
        if (this.orientationObs.observers.length > 0) {
            let next: DeviceOrientation = newOrientation.landscape ? "landscape" : "portrait"
            this._zone.run(
                () => { this.orientationObs.next(next); }
            );
        }
    }

    private applierWrapperCallback(newOrientation: any) {
        let next: DeviceOrientation = newOrientation.landscape ? "landscape" : "portrait"
        this._zone.run(
            () => {
                this.addedAppliers.forEach(
                    (applier) => {
                        applier(next)
                    }
                )
            }
        );
    }

    getActualOrientation(): string {
        return orientation.getOrientation()
    }

    setOrientation(newOrientation: DeviceOrientation, animation?: boolean) {
        orientation.setOrientation(newOrientation, animation);
    }

    getOrientation(): Observable<string> {
        return this.orientationObs;
    }

    addApplierCallback(callback: OrientationCallback) {
        this.addedAppliers.push(callback);
    }

    removeApplierCallback(callback: OrientationCallback) {
        let index: number = this.addedAppliers.indexOf(callback);
        if (index > 0) {
            this.addedAppliers.splice(index, 1);
        }
    }

}