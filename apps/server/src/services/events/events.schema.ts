// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

export const eventSchema = Type.Object(
  {
    id: Type.Number(),
    type: Type.Optional(Type.String()),
    observer: Type.Optional(Type.String()),
    sender: Type.Optional(Type.String()),
    entities: Type.Optional(Type.Array(Type.String())),
    client: Type.Optional(Type.String()),
    channel: Type.Optional(Type.String()),
    channelType: Type.Optional(Type.String()),
    content: Type.Optional(Type.String()),
    agentId: Type.Number(),
    projectId: Type.String(),
    date: Type.Optional(Type.String()),
    embedding: Type.Optional(Type.Any()),
  },
  { $id: 'Event', additionalProperties: false }
)
export type Event = Static<typeof eventSchema>
export const eventResolver = resolve<Event, HookContext>({})

export const eventExternalResolver = resolve<Event, HookContext>({})

// Schema for creating new entries
export const eventDataSchema = Type.Pick(eventSchema, [
  'type',
  'observer',
  'sender',
  'entities',
  'client',
  'channel',
  'channelType',
  'projectId',
  'content',
  'agentId',
  'date',
  'embedding'
], {
  $id: 'EventData'
})
export type EventData = Static<typeof eventDataSchema>
export const eventDataValidator = getDataValidator(eventDataSchema, dataValidator)
export const eventDataResolver = resolve<Event, HookContext>({})

// Schema for updating existing entries
export const eventPatchSchema = Type.Partial(eventDataSchema, {
  $id: 'EventPatch'
})
export type EventPatch = Static<typeof eventPatchSchema>
export const eventPatchValidator = getDataValidator(eventPatchSchema, dataValidator)
export const eventPatchResolver = resolve<Event, HookContext>({})

// Schema for allowed query properties
export const eventQueryProperties = Type.Pick(eventSchema, [
  'id',
  'type',
  'observer',
  'sender',
  'entities',
  'client',
  'channel',
  'channelType',
  'projectId',
  'content',
  'agentId',
  'date',
  'embedding'
])
export const eventQuerySchema = Type.Intersect(
  [
    querySyntax(eventQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type EventQuery = Static<typeof eventQuerySchema>
export const eventQueryValidator = getValidator(eventQuerySchema, queryValidator)
export const eventQueryResolver = resolve<EventQuery, HookContext>({})
