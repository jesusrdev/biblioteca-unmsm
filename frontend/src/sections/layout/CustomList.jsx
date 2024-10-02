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
            <ListItemButton className="rounded-full hover:bg-blue-light text-custom-gray">
              <ListItemIcon></ListItemIcon>
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
