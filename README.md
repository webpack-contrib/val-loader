import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://gusc1-epic-swift-30464.upstash.io',
  token: 'AXcAASQgMDJhODg4MTktMjZiOS00N2VkLThmODAtN2FjNDBkNDNhODI1ZDJkNjg4MDUyYjRjNDk5ZWFhZWQ5OTYyMzE4MWIyYjA=',
})

const data = await redis.set('foo', 'bar');
