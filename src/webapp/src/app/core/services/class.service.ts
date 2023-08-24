import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
    private _ClassID!: string | null;

    getClassID(): string | null {
        return this._ClassID;
    }

    setClassID(classID: string | null): void {
        this._ClassID = classID;
    }
}