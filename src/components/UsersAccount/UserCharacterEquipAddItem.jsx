import React from "react";


const UserCharacterEquipAddItemPopup = (props) => {
    console.log(props.filteredItems)
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
                                        <div className="character-equip-add-item-title">Title</div>
                                        <div className="character-equip-add-item-img-wrap">
                                            <img src="#" />
                                        </div>
                                        <div className="character-equip-add-item-controls-wrap">
                                            <span className="character-equip-add-item-select-btn"></span>
                                            <span className="character-equip-add-item-info-btn"></span>
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