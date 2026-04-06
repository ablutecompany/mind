export default function handler(req: any, res: any) {
  res.status(200).json({
    status: 'online',
    engine: 'mind-inference-core',
    version: '2.1.0',
    timestamp: new Date().toISOString()
  });
}
