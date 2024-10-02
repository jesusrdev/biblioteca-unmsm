import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

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
                <img src={item.icon} alt="icon" width={25} height={25} />
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
