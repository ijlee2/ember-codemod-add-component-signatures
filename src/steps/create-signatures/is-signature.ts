function getKeys(nodes: unknown[]): Set<string> {
  type Node = { key: { name: string } };

  return new Set((nodes as Node[]).map(({ key }) => key.name));
}

export function isSignature(nodes: unknown[]): boolean {
  const keys = getKeys(nodes);

  return keys.has('Args') || keys.has('Blocks') || keys.has('Element');
}
