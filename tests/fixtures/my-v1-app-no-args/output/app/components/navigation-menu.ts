import templateOnlyComponent from '@ember/component/template-only';

interface NavigationMenuSignature {
  Args: {
    menuItems: unknown;
    name: unknown;
  };
  Element: HTMLElement;
}

const NavigationMenu = templateOnlyComponent<NavigationMenuSignature>();

export default NavigationMenu;
