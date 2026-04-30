import { type SchemaTypeDefinition } from 'sanity'
import { portfolioItemType } from './portfolioItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioItemType],
}
