import { useState, useRef, useEffect } from "react";
import { Card, message, Skeleton } from "antd";
import icon from "../assets/checkbox.png";


//Author Name:Neaz Morshed
//Date:11/05/2023
//email:neazmorshed180031@gmail.com

export default function Galary({ galleryImages }) {
  const [data, setData] = useState(galleryImages); //This is the array of data
  const [hide, setHide] = useState(0); // This is for show and hide checkbox icon on hover
  const [ids, setIds] = useState([]); // This is for tracking the selected the items id
  const [lastids, setLastids] = useState([]); // This is for tracking the index of array after changing the
  //the position of image
  const [check, setCheck] = useState(0); //This is for showing the selected items and removing the selected items after delete
  const [loading, setLoading] = useState(true); // This is for shimmer effect
  let todoItemDrag = useRef();
  let todoItemDragOver = useRef();
  useEffect(() => {
    const temp = [...data]; // taking copy of the data array by spreading operator
    let finalArr = []; // Intializing the final array which is going to be pushed in the data array after inserting some additional information

    temp.forEach((item) => {
      // running a loop for getting each item of temp array and push in Final array
      finalArr.push({
        id: item.id,
        todo: item.todo,
        isDragging: false,
        isChecked: false,
      });
    });
    setLoading(false); // Turning off the shimmer effect
    setData(finalArr); // Set the final array
  }, [ids]);

  function show(val) {
    setCheck(1);
    // this switch case will be responsible for show and hide checkbox on hover for each card
    switch (val) {
      case 1:
        setHide(1);
        break;
      case 2:
        setHide(2);
        break;
      case 3:
        setHide(3);
        break;
      case 4:
        setHide(4);
        break;
      case 5:
        setHide(5);
        break;
      case 6:
        setHide(6);
        break;
      case 7:
        setHide(7);
        break;
      case 8:
        setHide(8);
        break;
      case 9:
        setHide(9);
        break;
      case 10:
        setHide(10);
        break;
      case 11:
        setHide(11);
        break;
      case 12:
        setHide(12);
        break;
    }
  }

  //This function fires when dragging start
  function D_Start(e, index) {
    todoItemDrag.current = index - 1;
  }

  // This function fires when dragged element eneters for final replacing
  function D_Enter(e, index) {
    todoItemDragOver.current = index - 1;

    const cpArr = [...data]; // taking copy of the data array by spreading operator

    let finalArr = [];

    cpArr.forEach((item) => {
      finalArr.push({
        id: item.id,
        todo: item.todo,
        isDragging: false,
      });
    });

    setData(finalArr); // updating the data array when dragged element is going to be placed
  }
  // eslint-disable-next-line no-unused-vars
  function D_End(e, index) {
    const arr1 = [...data];

    const todo_item_main = arr1[todoItemDrag.current]; // This is for pointing the dragged item
    arr1.splice(todoItemDrag.current, 1); // Update the array according to the suffled item
    arr1.splice(todoItemDragOver.current, 0, todo_item_main);

    todoItemDrag.current = null;
    todoItemDragOver.current = null;

    let f_arr = [];

    arr1.forEach((item) => {
      f_arr.push({
        id: item.id,
        todo: item.todo,
        isDragging: false,
      });
    });

    setIds([]); // Turing off the checkebox when an element is dragged in order to eradicate confusion
    setData(f_arr); //Updating the data array after an item is placed
  }

  function clicked(e) {
    const { id, checked } = e; // Destructering the event target value and taking the id, isChecked value

    let tempdata = data.map((d) => {
      return d.id == id ? { ...d, isChecked: checked } : { ...d }; // Updating the isChecked value from false to true according to id
    });
    setData(tempdata); // Updating the data according to the updated isChecked value

    setCheck(1);

    const findone = ids.some((e) => {
      // Finding the the given value exist or not in the array
      if (e == id) {
        return true;
      }
      return false;
    });
    if (findone) {
      // If the given id already exist in the array then remove that otherwise push that id in the array
      const index = ids.indexOf(id);
      ids.splice(index, 1);
    } else {
      ids.push(id);
    }
  }

  function deleted() {
    // This loop in loop will find the index number of the selected items in the final updated data array
    //So that we can precisely delete and item after sorted
    data.forEach((d) => {
      ids.forEach((i) => {
        if (d.id == i) {
          const index = data.indexOf(d);

          lastids.push(index);
        }
      });
    });

    // This for loop will finally delete the item from data array according to the index number which is in lastids array
    for (let i = ids.length - 1; i >= 0; i--) {
      data.splice(lastids[i], 1);
    }
    setData(data); //Update the final data array
    setCheck(0);
    setLastids([]);
    setIds([]);
    // This will show a message that how many items have been deleted by the user
    message.success(
      `${
        lastids.length == 1
          ? `${lastids.length} Item Deleted`
          : `${lastids.length} Items Deleted`
      } `
    );
  }

  return (
    <div>
      <p
        className={`${
          ids.length == 0 ? "visible absolute  font-bold" : "invisible" //show and hide paragraph according to the selected items
        }`}
      >
        Gallery
      </p>
      <div className="flex flex-row-reverse justify-between">
        <button
          className={`  mb-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ${
            ids.length > 0 ? "visible" : "invisible"
          } `}
          onClick={() => deleted()}
        >
          {`${
            ids.length == 1 ? "Delete File" : "Delete Files" //show and delete button according to the ids array length
          }`}
        </button>
        <div
          className={`${
            ids.length > 0
              ? "visible flex flex-row justify-between "
              : "invisible"
          }`}
        >
          <div className="p-1">
            <img src={icon} />
          </div>
          <div>
            <p className="font-bold">{`${ids.length}`}File Selected</p>
          </div>
        </div>
      </div>

      <Card bordered={true} style={{ borderColor: "#D3D3D3" }}>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {data.map((d, i) => (
            //show the shimmer effect
            <Skeleton loading={loading} key={i}>
              <Card
                key={i}
                style={{ borderColor: " #bbbaba" }}
                bordered={true}
                className={`${i == 0 ? "col-span-2 row-span-2 " : ""}`}
                hoverable={true}
                onMouseEnter={() => show(i + 1)}
                onMouseLeave={() => setHide(0)}
              >
                <input
                  type="checkbox"
                  id={d.id}
                  checked={d.isChecked}
                  onChange={(e) => clicked(e.target)}
                  className={`relative flex justify-start ${
                    hide == i + 1 ? "visible" : "invisible"
                  }  ${
                    check == 1 ? "checked:visible" : "invisible"
                  }   checked:visible w-4 h-4 text-blue-600 bg-gray-100 border-gray-800 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 `}
                />

                <img
                  className={`${d.isChecked ? "opacity-30" : ""}`}
                  draggable
                  onDragStart={(e) => D_Start(e, i + 1)}
                  onDragEnter={(e) => D_Enter(e, i + 1)}
                  onDragEnd={(e) => D_End(e, i + 1)}
                  // eslint-disable-next-line react/no-unknown-property
                  droppable
                  src={d.todo}
                />
              </Card>
            </Skeleton>
          ))}
        </div>
      </Card>
    </div>
  );
}
