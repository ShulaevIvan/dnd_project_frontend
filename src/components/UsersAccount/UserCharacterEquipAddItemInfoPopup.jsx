import React from "react";

const UserCharacterEquipAddItemPopupInfo = (props) => {
    
    const itemParametrs = (itemParamObj) => {
        const params = Object.entries(itemParamObj).map((item) => {
            if (item[0] !== 'id' && item[0] !== 'description') {
                return (
                    {name: item[0], value: item[1]}
                )
            }
        }).filter((param) => param);
        return params;
    };
    
    return (
        <React.Fragment>
            <div className="user-character-add-item-info-popup-wrap" style={{left: `${props.mouseCords.x}px`, top: `${props.mouseCords.y}px`}}>
                <div className="user-character-add-item-info-popup-close-wrap">
                    <span 
                        className="user-character-add-item-info-popup-close-btn"
                        onClick={() => props.popupCloseHandler(false)}
                    ></span>
                </div>
                <div className="user-character-add-item-info-popup-title">{props.infoItem.name}</div>
                <div className="user-character-add-item-info-popup-body">
                    <div className="user-character-add-item-info-parametrs-row">
                        <div className="user-character-add-item-info-parametrs">
                            {itemParametrs(props.infoItem).map((param) => {
                                return (
                                    <React.Fragment key={Math.random()}>
                                        <li>{`${param.name} - ${param.value}`}</li>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                        <div className="user-character-add-item-info-image"><img src="#" /></div>
                    </div>
                    <div className="user-character-add-item-info-description">
                        <p>{props.infoItem.description}</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default UserCharacterEquipAddItemPopupInfo;