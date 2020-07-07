import ClMenu from './src/menu.vue'
import ClMenuItem from './src/menu-item.vue'
import ClSubmenu from './src/submenu.vue'
import ClMenuGroup from './src/menu-group.vue'

ClMenu.MenuItem = ClMenuItem;
ClMenu.MenuGroup = ClMenuGroup;
ClMenu.Submenu = ClSubmenu;


export default ClMenu
