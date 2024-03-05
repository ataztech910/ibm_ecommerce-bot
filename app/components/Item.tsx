import { lightenDarkenColor } from "@/utils/colors";
import { WebAppDataContext } from "@/utils/web-app-provider";
import { Card, CardBody, CardFooter, Image, CardHeader, Button } from "@nextui-org/react";
import { useContext } from "react";

export default function Item({ item, themeParams }: any) {
    const { state, actions } = useContext(WebAppDataContext);

    const addItemToCart = () => {
        actions.setAppAnimation({...state.appAnimation, ...{cartCount: ++state.appAnimation.cartCount}});
    }

    const showItem = () => {
        actions.setAppAnimation({...state.appAnimation, ...{catalogIsOpen: false, selectedItem: item.id}});
    }

    return (
        <Card shadow="sm" key={item.id} 
            style={
                {
                backgroundColor: `${lightenDarkenColor(themeParams.secondary_bg_color, 85)}`,
                color: `${themeParams.section_header_text_color}`
                }
            }
                isPressable onPress={showItem}>
          
          <CardBody className="overflow-visible py-2">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src={item.image}
            />
          </CardBody>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="text-small">{item.title}</h4>
          </CardHeader>
          <CardFooter className="text-small justify-between">
                <Button onPress={addItemToCart} className="w-full">{item.price} $</Button>
          </CardFooter>
        </Card>
    )
}