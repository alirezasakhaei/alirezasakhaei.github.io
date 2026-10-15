import type { IncomingMessage, ServerResponse } from 'node:http'

export function handleDiary(req: IncomingMessage, res: ServerResponse): Promise<void>
