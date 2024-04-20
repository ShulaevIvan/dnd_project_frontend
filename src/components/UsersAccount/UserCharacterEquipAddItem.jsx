import React from "react";


const UserCharacterEquipAddItemPopup = (props) => {
    
    const reduceItemName = (nameString, maxLength) => {
        const stringLength = nameString.split('').length;
        if (Number(stringLength) > 15) {
            const baseString = nameString.split('').splice(0, stringLength - maxLength);
            return `${baseString.join('')}...`;
        }
        return nameString;
    };

    return (
        <React.Fragment>
            <div className="character-equip-add-item-popup-wrap" style={{left: `${props.mouseCords.x}px`, top: `${props.mouseCords.y}px`}}>
                <div className="character-equip-add-item-popup-close-btn-wrap">
                    <span 
                        className="character-equip-add-item-popup-close-btn"
                        onClick={() => props.addItemPopupHandler(false)}
                    ></span>
                </div>
                <div className="character-equip-add-item-popup-body">
                    <div className="character-equip-item-search-wrap">
                        <div className="character-equip-item-search-title">Search</div>
                        <div className="character-equip-item-search">
                            <input type="text" placeholder="search item..." />
                        </div>
                    </div>
                    <div className="character-equip-item-types-row">
                        {props.itemTypes.filter((itemType) =>  itemType.slot === props.infoItem.slot).map((item) => {
                            return (
                                <React.Fragment key={Math.random()}>
                                    <div className="character-equip-item-type">
                                        <span>{item.slot}</span>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </div>

                    <div className="character-equip-add-items-result-row">
                        {props.filteredItems.map((item) => {
                            return (
                                <React.Fragment key={Math.random()}>
                                    <div className="character-equip-add-item-wrap">
                                        <div className="character-equip-add-item-title">{reduceItemName(item.name, 10)}</div>
                                        <div className="character-equip-add-item-img-wrap">
                                            <img src="#" />
                                        </div>
                                        <div className="character-equip-add-item-controls-wrap">
                                            <span 
                                                className="character-equip-add-item-select-btn"
                                                onClick={() => props.addItemHandler(item)}
                                            ></span>
                                            <span 
                                                className="character-equip-add-item-info-btn"
                                                onClick={() => props.addItemInfoHandler(true, item)}
                                            ></span>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                        
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default UserCharacterEquipAddItemPopup;