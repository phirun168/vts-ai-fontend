import {
  SettingOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  BarsOutlined,
  AppstoreAddOutlined,
  HomeOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { PERMS } from "../constants/permission/perms";
import { AuthContext } from "../contexts/AuthContext";
//
//Main structure
const getItem = (label, key, icon, children, type) => ({
  key,
  icon,
  children,
  label,
  type,
});
//end Main structure
//
//
const GetMenuSideBar = (collapsed) => {
  const { access_token, checkPermission } = useContext(AuthContext);

  //
  //refresh storage
  const [menuKey, setMenuKey] = useState(0);

  const refreshMenu = () => setMenuKey((prev) => prev + 1);

  useEffect(() => {
    window.addEventListener("storage", refreshMenu);
    return () => {
      window.removeEventListener("storage", refreshMenu);
    };
  }, []);
  // Retrieve from localStorage
  const menuSideBarRaw = localStorage.getItem("menu_sidebar");
  let menuSideBar = [];

  try {
    menuSideBar = menuSideBarRaw ? JSON.parse(menuSideBarRaw) : [];
  } catch (error) {
    console.error("Failed to parse menu_sidebar from localStorage:", error);
    menuSideBar = [];
  }

  // Ensure the required default items are included
  //example , ['dashboard']
  const requiredItems = ["/workspace", "/chat-board"];
  const updatedMenuSideBar = [...new Set([...menuSideBar, ...requiredItems])];
  localStorage.setItem("menu_sidebar", JSON.stringify(updatedMenuSideBar));

  // Use the updated menu bar in your state
  const [menuBar, setMenuBar] = useState(updatedMenuSideBar);
  const menuItems = [
    //blank page
    {
      label: collapsed ? "" : "AI",
      key: "group.AI",
      type: "group",
      index: 1,
    },
    {
      label: "Workspace",
      key: "/workspace",
      type: "key",
      index: 1,
      gKey: "group.AI",
      icon: <DashboardOutlined />,
    },
    {
      label: "AI Tools",
      key: "/ai-tools",
      type: "parent",
      index: 1,
      gKey: "group.AI",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Chat Board",
      key: "/chat-board",
      type: "key",
      index: 1,
      pKey: "/ai-tools",
    },
    //end blank page
    // dashboard
    // {
    //   label: collapsed ? '' : 'DASHBOARD',
    //   key: 'group.dashboard',
    //   type: 'group',
    //   index: 2,
    // },
    // checkPermission(PERMS.DASHBOARD_SYSTEM)
    //   ?
    // {
    //   label: 'Dashboard',
    //   key: '/dashboard',
    //   type: 'key',
    //   index: 1,
    //   gKey: 'group.dashboard',
    //   icon: <DashboardOutlined />,
    // },
    // : '',,
    //end dashboard
    //mobile
    // {
    //   label: collapsed ? '' : 'MOBILES APP',
    //   key: 'group.mobile',
    //   type: 'group',
    //   index: 3,
    // },
    // {
    //   label: 'App',
    //   key: '/app',
    //   type: 'parent',
    //   index: 1,
    //   gKey: 'group.mobile',
    //   icon: <AppstoreOutlined />,
    // },
    // {
    //   label: 'User',
    //   key: '/app/user',
    //   type: 'key',
    //   index: 1,
    //   pKey: '/app',
    // },
    // {
    //   label: ' Request List Place',
    //   key: '/request-list-place',
    //   type: 'key',
    //   index: 2,
    //   pKey: '/app',
    // },
    //management
    // {
    //   label: 'Management',
    //   key: '/management',
    //   type: 'parent',
    //   index: 2,
    //   gKey: 'group.mobile',
    //   icon: <AppstoreAddOutlined />,
    // },
    // {
    //   label: 'Home Page',
    //   key: '/home',
    //   type: 'key',
    //   index: 1,
    //   pKey: '/management',
    // },
    //management
    //end mobile
    //*-------------------------setting---------------------*//
    //setting
    // group setting
    // {
    //   label: collapsed ? '' : 'SETTING',
    //   key: 'group.setting',
    //   type: 'group',
    //   index: 4,
    // },
    //group setting
    //parents
    // {
    //   label: 'Setup',
    //   key: '/setup',
    //   type: 'parent',
    //   index: 1,
    //   gKey: 'group.setting',
    //   icon: <SettingOutlined />,
    // },

    //*----------------Partner----------------------*//
    // {
    //   label: 'Province',
    //   key: '/province',
    //   type: 'key',
    //   index: 1,
    //   pKey: '/setup',
    // },
    // {
    //   label: 'Category',
    //   key: '/category',
    //   type: 'key',
    //   index: 2,
    //   pKey: '/setup',
    // },
    // {
    //   label: 'Sub Category',
    //   key: '/sub-category',
    //   type: 'key',
    //   index: 3,
    //   pKey: '/setup',
    // },
    // {
    //   label: 'Type',
    //   key: '/type',
    //   type: 'key',
    //   index: 4,
    //   pKey: '/setup',
    // },

    // {
    //   label: 'Hashtags',
    //   key: '/hashtags',
    //   type: 'key',
    //   index: 5,
    //   pKey: '/setup',
    // },
    // {
    //   label: 'Activity',
    //   key: '/activity',
    //   type: 'key',
    //   index: 6,
    //   pKey: '/setup',
    // },
    // {
    //   label: 'Amenity',
    //   key: '/amenity',
    //   type: 'key',
    //   index: 7,
    //   pKey: '/setup',
    // },
    // {
    //   label: 'Privacy',
    //   key: '/privacy',
    //   type: 'key',
    //   index: 8,
    //   pKey: '/setup',
    // },
    // {
    //   label: 'Feature',
    //   key: '/feature',
    //   type: 'key',
    //   index: 9,
    //   pKey: '/setup',
    // },
    // {
    //   label: 'Keyword',
    //   key: '/keyword',
    //   type: 'key',
    //   index: 10,
    //   pKey: '/setup',
    // },
    //group other
    // {
    //   label: 'Other',
    //   key: '/other',
    //   type: 'parent',
    //   index: 2,
    //   gKey: 'group.setting',
    //   icon: <LinkOutlined />,
    // },
    // {
    //   label: 'Filter Copy',
    //   key: '/filter-copy-address',
    //   type: 'key',
    //   index: 1,
    //   pKey: '/other',
    // },
    //other

    //----------end partner--------------
    //-----------Post--------------------
    // {
    //   label: collapsed ? '' : 'Post',
    //   key: 'group.posts',
    //   type: 'group',
    //   index: 5,
    // },
    // {
    //   label: 'Post',
    //   key: '/posts',
    //   type: 'parent',
    //   index: 1,
    //   gKey: 'group.posts',
    //   icon: <BarsOutlined />,
    // },
    // {
    //   label: 'List Place',
    //   key: '/list-place',
    //   type: 'key',
    //   index: 1,
    //   pKey: '/posts',
    // },
    // {
    //   label: 'Moment',
    //   key: '/moment',
    //   type: 'key',
    //   index: 2,
    //   pKey: '/posts',
    // },
    // {
    //   label: 'Promotion&Event',
    //   key: '/promotion&event',
    //   type: 'key',
    //   index: 3,
    //   pKey: '/posts',
    // },

    // {
    //   label: 'Service',
    //   key: '/service',
    //   type: 'key',
    //   index: 4,
    //   pKey: '/posts',
    // },
    // {
    //   label: 'Additional Service',
    //   key: '/additional-service',
    //   type: 'key',
    //   index: 5,
    //   pKey: '/posts',
    // },
    // {
    //   label: 'Tours',
    //   key: '/tours',
    //   type: 'key',
    //   index: 6,
    //   pKey: '/posts',
    // },

    //----------end post-----------------
    // GROUP MANAGE PROPERTY

    // {
    //   label: collapsed ? '' : 'Manage Property',
    //   key: 'group.manage_property',
    //   type: 'group',
    //   index: 6,
    // },
    // {
    //   label: 'Place Listing',
    //   key: '/placeListing',
    //   type: 'parent',
    //   index: 1,
    //   gKey: 'group.manage_property',
    //   icon: <HomeOutlined />,
    // },

    // {
    //   label: 'All Property',
    //   key: '/property',
    //   type: 'key',
    //   index: 1,
    //   pKey: '/placeListing',
    // },
    // {
    //   label: 'Follow Up',
    //   key: '/followUp',
    //   type: 'key',
    //   index: 2,
    //   pKey: '/placeListing',
    // },
    // {
    //   label: 'Review Import',
    //   key: '/review-import',
    //   type: 'key',
    //   index: 3,
    //   pKey: '/placeListing',
    // },

    // END GROUP MANAGE PROPERTY
  ];
  //
  // const items = process.env.NODE_ENV === 'production' ? menuBar : data

  let menu = [];

  for (let i = 0; i < menuBar.length; i++) {
    let menuKey = menuBar[i];

    //
    const findIndexMenuKey = menuItems.findIndex((el) => el.key === menuKey);
    //

    if (findIndexMenuKey === -1) continue;
    const menuItem = menuItems[findIndexMenuKey];
    //
    if (menuItem?.type === "key" && menuItem?.pKey) {
      //
      const findParentIndex = menuItems.findIndex(
        (el) => el.key === menuItem?.pKey && el.type === "parent"
      );
      if (findParentIndex === -1) continue;
      const parentItem = menuItems[findParentIndex];
      //
      const findGroupIndex = menuItems.findIndex(
        (el) => el.key === parentItem?.gKey && el.type === "group"
      );
      if (findGroupIndex === -1) continue;
      const groupItem = menuItems[findGroupIndex];

      //
      const checkGroupItemExists = menu.some((el) => el.key === groupItem?.key);
      // console.log('check group item', checkGroupItemExists)
      //
      if (checkGroupItemExists) {
        const findGroupIndexExists = menu.findIndex(
          (el) => el.key === groupItem?.key
        );
        if (findGroupIndexExists === -1) continue;
        //   console.log("key exists", findGroupIndexExists);
        //
        const checkParentItemExists = menu[findGroupIndexExists]?.children.some(
          (el) => el.key === parentItem?.key
        );
        //   console.log("parent exists", checkParentItemExists);
        if (checkParentItemExists) {
          const findParentIndexExists = menu[
            findGroupIndexExists
          ]?.children.findIndex((el) => el.key === parentItem?.key);
          // console.log('parent exists index', findParentIndexExists)
          //
          menu[findGroupIndexExists]?.children[
            findParentIndexExists
          ]?.children.push({
            ...getItem(menuItem?.label, menuItem?.key),
            index: menuItem?.index,
          });
        } else {
          menu[findGroupIndexExists]?.children.push({
            ...getItem(parentItem?.label, parentItem?.key, parentItem?.icon),
            children: [
              {
                ...getItem(menuItem?.label, menuItem?.key, menuItem?.icon),
                index: menuItem?.index,
              },
            ],
            index: parentItem?.index,
          });

          // menu[findGroupIndexExists]?.children.push({
          //   ...getItem(parentItem?.label, parentItem?.key),
          //   children: [
          //     {
          //       ...getItem(menuItem?.label, menuItem?.key),
          //       index: menuItem?.index,
          //     },
          //   ],
          //   index: parentItem?.index,
          // })
        }

        //
      } else {
        // return group
        menu.push({
          ...getItem(
            groupItem?.label,
            groupItem?.key,
            menuItem?.icon,
            [],
            groupItem?.type
          ),
          children: [
            {
              ...getItem(parentItem?.label, parentItem?.key, parentItem?.icon),
              children: [
                {
                  ...getItem(menuItem?.label, menuItem?.key, menuItem?.icon),
                  index: menuItem?.index,
                },
              ],
              index: parentItem?.index,
            },
          ],
          index: groupItem?.index,
        });
      }
      //end return group
    } else if (menuItem?.type === "key" && !menuItem?.pKey) {
      //
      const findGroupIndex = menuItems.findIndex(
        (el) => el.key === menuItem?.gKey && el.type === "group"
      );
      if (findGroupIndex === -1) continue;
      const groupItem = menuItems[findGroupIndex];
      //

      const checkGroupItemExists = menu.some((el) => el.key === groupItem?.key);

      if (checkGroupItemExists) {
        const findGroupIndexExists = menu.findIndex(
          (el) => el.key === groupItem?.key
        );
        if (findGroupIndexExists === -1) continue;
        //
        menu[findGroupIndexExists]?.children.push({
          ...getItem(menuItem?.label, menuItem?.key),
          index: menuItem?.index,
        });
        //
      } else {
        menu.push({
          ...getItem(
            groupItem?.label,
            groupItem?.key,
            groupItem?.icon,

            // null,
            [],
            groupItem?.type
          ),
          children: [
            {
              ...getItem(menuItem?.label, menuItem?.key, menuItem?.icon),
              index: menuItem?.index,
            },
          ],
          index: groupItem?.index,
        });
      }
      //
      //
    } else continue;
  }
  // console.log(groupItem, 'test')

  return menu.sort((a, b) => a.index - b.index);
};

export default GetMenuSideBar;
