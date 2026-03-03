import templateOnlyComponent from '@ember/component/template-only';

type MenuItem = {
  label: string;
  route: string;
};

interface NavigationMenuSignature {
  Args: {
    menuItems: MenuItem[];
    name?: string;
  };
}

const NavigationMenu = templateOnlyComponent<NavigationMenuSignature>();

export default NavigationMenu;
