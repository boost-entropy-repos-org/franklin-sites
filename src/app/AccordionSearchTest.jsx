/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import DefaultPageLayout from './layout/DefaultPageLayout';
import { AccordionSearch } from '../components';

const Selected = ['accession', 'id'];

const AccordionData = [
  {
    id: 'Names & Taxonomy',
    title: 'Names & Taxonomy',
    items: [
      { id: 'accession', label: 'Entry' },
      { id: 'id', label: 'Entry Name' },
      { id: 'gene_names', label: 'Gene Names' },
      { id: 'gene_oln', label: 'Gene Names (ordered locus)' },
      { id: 'gene_orf', label: 'Gene Names (ORF)' },
      { id: 'gene_primary', label: 'Gene Names (primary)' },
      { id: 'gene_synonym', label: 'Gene Names (synonym)' },
      { id: 'organism', label: 'Organism' },
      { id: 'organism_id', label: 'Organism (ID)' },
      { id: 'protein_name', label: 'Protein names' },
      { id: 'dr:proteomes', label: 'Proteomes' },
      { id: 'lineage', label: 'Taxonomic lineage' },
      { id: 'organism_host', label: 'Virus hosts' },
    ],
  },
  {
    id: 'Sequences',
    title: 'Sequences',
    items: [
      { id: 'cc:alternative_products', label: 'Alternative products (isoforms)' },
      { id: 'ft:var_seq', label: 'Alternative sequence' },
      { id: 'error_gmodel_pred', label: 'Erroneous gene model prediction' },
      { id: 'fragment', label: 'Fragment' },
      { id: 'gene_location', label: 'Gene encoded by' },
      { id: 'length', label: 'Length' },
    ],
  },
  {
    id: 'Function',
    title: 'Function',
    items: [
      { id: 'absorption', label: 'Absorption' },
      { id: 'ft:act_site', label: 'Active site' },
      { id: 'ft:binding', label: 'Binding site' },
      { id: 'ft:ca_bind', label: 'Calcium binding' },
    ],
  },
];

const removeItemFromList = (list, index) => [...list.slice(0, index), ...list.slice(index + 1)];

const getFieldDataForColumns = (columns, fieldData) => {
  const selected = new Array(columns.length);
  fieldData.forEach(({ id: accordionId, items }) => {
    items.forEach(({ id: itemId, label }) => {
      const index = columns.indexOf(itemId);
      if (index >= 0) {
        selected[index] = {
          accordionId,
          itemId,
          label,
        };
      }
    });
  });
  return selected;
};

const AccordionSearchTestContent = ({ selected: initialSelected, accordionData }) => {
  const [selected, setSelected] = useState(initialSelected);

  const handleSelect = (itemId) => {
    const index = selected.indexOf(itemId);
    setSelected(index >= 0 ? removeItemFromList(selected, index) : [...selected, itemId]);
  };

  return (
    <AccordionSearch
      accordionData={accordionData}
      onSelect={(_accordionId, itemId) => handleSelect(itemId)}
      selected={getFieldDataForColumns(selected, accordionData)}
      columns
    />
  );
};

const AccordionSearchTest = () => (
  <DefaultPageLayout
    title="Franklin - Accordion Search Test"
    content={<AccordionSearchTestContent selected={Selected} accordionData={AccordionData} />}
  />
);

export default AccordionSearchTest;
