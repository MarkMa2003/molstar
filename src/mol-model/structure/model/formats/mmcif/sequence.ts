/**
 * Copyright (c) 2018 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { mmCIF_Database as mmCIF } from 'mol-io/reader/cif/schema/mmcif'
import Sequence from '../../properties/sequence'
import { Column } from 'mol-data/db';
import { AtomicHierarchy } from '../../properties/atomic';
import { Entities } from '../../properties/common';

// TODO how to handle microheterogeneity
//    see http://mmcif.wwpdb.org/dictionaries/mmcif_pdbx_v50.dic/Categories/entity_poly_seq.html
//
// Data items in the ENTITY_POLY_SEQ category specify the sequence
// of monomers in a polymer. Allowance is made for the possibility
// of microheterogeneity in a sample by allowing a given sequence
// number to be correlated with more than one monomer ID. The
// corresponding ATOM_SITE entries should reflect this
// heterogeneity.

export function getSequence(cif: mmCIF, entities: Entities, hierarchy: AtomicHierarchy): Sequence {
    if (!cif.entity_poly_seq._rowCount) return Sequence.fromAtomicHierarchy(entities, hierarchy);

    const { entity_id, num, mon_id } = cif.entity_poly_seq;

    const byEntityKey: Sequence['byEntityKey'] = {};
    const count = entity_id.rowCount;

    let i = 0;
    while (i < count) {
        const start = i;
        while (i < count - 1 && entity_id.areValuesEqual(i, i + 1)) i++;
        i++;

        const id = entity_id.value(start);
        byEntityKey[entities.getEntityIndex(id)] = { entityId: id, compId: Column.window(mon_id, start, i), num: Column.window(num, start, i)  }
    }

    return { byEntityKey };
}