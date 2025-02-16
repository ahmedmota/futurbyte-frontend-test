import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ChooseCard.module.css";

const ChooseCard = ({
  section,
  selections,
  onSelectionChange,
  userSelections,
  isMultiple = true,
  firstCards,
  isFirst,
  onSelect,
  selectSelections,
}) => {
  // Assume that you fetch items from an API
  const [items, setItems] = useState([...selections]);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (
    index,
    isMultipleAllow,
    label,
    category,
    value,
    isChecked,
    id
  ) => {
    console.log("This is checked", isChecked);
    if (!isMultipleAllow) {
      let newCheckedItems = [];
      if (checkedItems[index] == true) {
        setCheckedItems(newCheckedItems);
        onSelectionChange(section, newCheckedItems);
      } else {
        newCheckedItems[index] = !newCheckedItems[index]; // Toggle the checked state
        setCheckedItems(newCheckedItems);
        onSelectionChange(section, newCheckedItems);
      }

      onSelect(label, category, value, isFirst, isChecked, isMultiple, id);
    } else {
      const newCheckedItems = [...checkedItems];
      newCheckedItems[index] = !newCheckedItems[index]; // Toggle the checked state
      setCheckedItems(newCheckedItems);
      onSelectionChange(section, newCheckedItems);

      onSelect(label, category, value, isFirst, isChecked, isMultiple, id);
    }
  };

  useEffect(() => {
    if (userSelections && userSelections[section]) {
      setCheckedItems(userSelections[section]);

      if (!isMultiple) {
        if (userSelections[section].length > 0) {
          let item = false;
          userSelections[section]?.forEach((el) => {
            if (el) {
              item = true;
            }
          });

          if (item) {
            setSelectMore(false);
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${styles["choose-card-all"]} ${
        firstCards ? styles["first-cards"] : ""
      }`}
    >
      {items.map((item, index) => (
        <div
          key={item.id} // Unique key based on item id
          // className={`${styles["choose-card"]} ${
          //   checkedItems[index] || selectSelections?.[index].isSelected
          //     ? styles["active-card"]
          //     : ""
          // }`}
          className={`${styles["choose-card"]} ${
            selectSelections?.[index].isSelected ? styles["active-card"] : ""
          }`}
          onClick={() =>
            isMultiple
              ? handleCheckboxChange(
                  index,
                  true,
                  section,
                  item.category,
                  item.label,
                  !selectSelections?.[index]?.isSelected, // Toggle checked state
                  item.documentId
                )
              : handleCheckboxChange(
                  index,
                  false,
                  section,
                  item.category,
                  item.label,
                  !selectSelections?.[index]?.isSelected, // Toggle checked state
                  item.documentId
                )
          }
        >
          <input
            className={styles["choose-card-input"]}
            type="checkbox"
            // checked={
            //   selectSelections
            //     ? selectSelections[index].isSelected
            //       ? true
            //       : checkedItems[index]
            //       ? true
            //       : false
            //     : false
            // }
            checked={
              selectSelections
                ? selectSelections?.[index]?.isSelected
                  ? selectSelections[index].isSelected
                  : false
                : false
            }
            // onChange={(e) =>
            //   isMultiple
            //     ? handleCheckboxChange(
            //         index,
            //         true,
            //         section,
            //         item.category,
            //         item.label,
            //         e.target.checked,
            //         item.documentId
            //       )
            //     : handleCheckboxChange(
            //         index,
            //         false,
            //         section,
            //         item.category,
            //         item.label,
            //         e.target.checked,
            //         item.documentId
            //       )
            // }
          />

          <div className={styles["choose-card-content"]}>
            <div className={styles["choose-content-box"]}>
              <Image
                // width={32}
                // height={32}
                width={item?.icon?.width ?? 64}
                height={item?.icon?.height ?? 64}
                src={item?.icon?.url}
                alt="monitor"
              />
            </div>
            <p>{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChooseCard;
