import { Injectable, Inject } from '@angular/core';

/**
 * Uses window.config to grab the config.
 * Provides the config values to the services.
 */
@Injectable()
export class ConfigService {
    private config: any;

    // AOT Compiler errors if 'Window' is injected here.
    // Will probably be fixed in the angular future.
    constructor() {
        const window = this.getWindow();

        if (window['config']) {
            this.config = window['config'];
            console.log('Configuration loaded ', this.config);
        } else {
            console.warn('No configuration found in window object');
        }
    }

    getWindow(): any {
        return window;
    }

    get baseHubUrl() {
        return this.config.baseHubUrl;
    }
    get baseApiUrl(){
        return this.config.baseApiUrl;
    }
}
