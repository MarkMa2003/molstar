/**
 * Copyright (c) 2018-2019 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { createPlugin, DefaultPluginSpec } from 'mol-plugin';
import './index.html'
require('mol-plugin/skin/light.scss')

createPlugin(document.getElementById('app')!, {
    ...DefaultPluginSpec,
    layout: {
        initial: {
            isExpanded: true,
            showControls: true
        }
    }
});