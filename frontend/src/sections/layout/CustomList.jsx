import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Image from "next/image";

export default function CustomList({ list }) {
  return (
    <List className="w-full px-3">
      {list.map(
        (item, index) => (
          <ListItem
            key={index}
            disablePadding
            className="my-3 "
          >
            <ListItemButton className="items-center transition-colors rounded-full hover:bg-blue-light hover:text-black text-custom-gray">
              <ListItemIcon className="mx-4 min-w-fit"> 
                <Image  src={item.icon} alt="icon" width={25} height={25} priority />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                className="*:font-bold font-montserrat"
              />
            </ListItemButton>
          </ListItem>
        )
      )}
    </List>
  );
}
