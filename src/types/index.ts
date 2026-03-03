type CodemodOptions = {
  componentStructure: 'flat' | 'nested';
  convertJavaScript: boolean;
  createRegistries: boolean;
  projectRoot: string;
};

type ComponentName = string;

type Context = {
  extensionMap: ExtensionMap;
  signatureMap: SignatureMap;
};

type UnfilteredComponentExtension = '.gjs' | '.gts' | '.hbs' | '.js' | '.ts';

type UnfilteredExtensionMap = Map<
  ComponentName,
  Set<UnfilteredComponentExtension>
>;

type ComponentExtension = Exclude<UnfilteredComponentExtension, '.gjs' | '.js'>;

type ExtensionMap = Map<ComponentName, Set<ComponentExtension>>;

type Signature = {
  Args: string[] | undefined;
  Blocks: Map<string, string[]> | undefined;
  Element: string[] | undefined;
};

type SignatureMap = Map<ComponentName, Signature>;

type Options = {
  componentStructure: 'flat' | 'nested';
  convertJavaScript: boolean;
  createRegistries: boolean;
  projectRoot: string;
  src: 'app' | 'addon' | 'src';
};

export type {
  CodemodOptions,
  ComponentExtension,
  ComponentName,
  Context,
  ExtensionMap,
  Options,
  Signature,
  SignatureMap,
  UnfilteredComponentExtension,
  UnfilteredExtensionMap,
};
