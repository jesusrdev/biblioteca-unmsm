import { Divider, List, ListItem, Toolbar } from "@mui/material";
import Image from "next/image";
import MenuAdmin from "./MenuAdmin";
import { principalList, sectionList } from "./items-bar";
import ButtonLeftBar from "./ButtonLeftBar";
import Link from "next/link";

export default function LeftBar() {
  return (
    <div>
      <Toolbar className="px-3">
        <div className="flex items-center justify-center p-2 rounded-full bg-gradient-to-bl from-blue-gr/40 from-0% via-to-purple-gr/40 via-50% to-pink-gr/40 to-100% gradient-logo mr-2 border-[4px] border-white border-solid shadow-xl">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={28}
            height={28}
            className=""
            priority
          />
        </div>
        <p className="text-xl font-bold">Yisus Library</p>
      </Toolbar>
      <Divider />
      <List className="w-full px-3">
        {principalList.map((item, index) => (
          <ListItem key={index} disablePadding className="my-3">
            <Link href={item.url} className="w-full no-underline">
              <ButtonLeftBar
                className="w-full"
                text={item.text}
                imageSrc={item.icon}
              />
            </Link>
          </ListItem>
        ))}
        <ListItem disablePadding className="my-3">
          <MenuAdmin />
        </ListItem>
      </List>
      <Divider />
      <List className="w-full px-3">
        {sectionList.map((item, index) => (
          <ListItem key={index} disablePadding className="my-3 ">
            <ButtonLeftBar
              className="w-full"
              text={item.text}
              imageSrc={item.icon}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
