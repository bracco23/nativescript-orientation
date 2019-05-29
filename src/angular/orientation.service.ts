import { Injectable, NgZone, OnDestroy } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";

export type DeviceOrientation = 'landscape' | 'portrait';

export type OrientationCallback = (orientation: DeviceOrientation) => void;

const orientation: ScreenOrientation = window.screen.orientation || // chrome and firefox
                                        (window.screen as any).mozorietation || // older firefox
                                        (window.screen as any).msorientation || // newer ie
                                        undefined; //well, ¯\_(ツ)_/¯

@Injectable()
export class Orientation implements OnDestroy {

    private orientationObs: BehaviorSubject<string>;
    private addedAppliers: OrientationCallback[];

    private fromNativeToDeviceOrientation(type: string){
        return ( type == 'landscape-primary' || type == 'landscape-secondary' ) ?
        'landscape' : 'portrait'
    }

    constructor(private _zone: NgZone) {
        this.addedAppliers = [];
        if (orientation) {
            this.orientationObs = new BehaviorSubject<string>(this.fromNativeToDeviceOrientation(orientation.type));
            orientation.onchange = this.onOrientationChange.bind(this);
        }else{
            this.orientationObs = new BehaviorSubject<string>("landscape");
        }
    }

    ngOnDestroy() {
    }

    private onOrientationChange(evt: Event) {
        if (this.orientationObs.observers.length > 0) {
            console.log("orientation changed! new: ", evt.target.type);
            let next: DeviceOrientation = this.fromNativeToDeviceOrientation(evt.target.type);  
            this._zone.run(
                () => {
                    this.orientationObs.next(next);
                    this.addedAppliers.forEach(
                        (applier) => {
                            applier(next)
                        }
                    )
                }
            );
        }
    }

    getActualOrientation(): string {
        return orientation && orientation.type ? orientation.type : 'landscape';
    }

    setOrientation(newOrientation: DeviceOrientation, animation?: boolean) {
        if(orientation){
            orientation.lock(newOrientation);
        }
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