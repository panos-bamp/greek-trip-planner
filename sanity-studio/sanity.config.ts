import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import insight from './schemaTypes/insight'

export default defineConfig({
  name: 'default',
  title: 'Greek Trip Planner Blog',

  projectId: 'puhk8qa7',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [...schemaTypes, insight],
  },
})