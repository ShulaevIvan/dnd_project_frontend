import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addUserCharacters, deleteUserCharacter } from "../../redux/slices/userSlice";

const UsersCharacters = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData.userData);
    const userCharacters = useSelector((state) => state.userData.userCharacters);

    const deleteCharacterHandler = (character) => {
        dispatch(deleteUserCharacter({characterId: character.id}));
        
        const fetchFunc = async () => {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userData.userId}/characters/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    characterId: character.id,
                    characterName: character.name,
                    userId: userData.userId,
                }),
            })
            .then((response) => {
                if (response.status === 204) {
                    dispatch(deleteUserCharacter({characterId: character.id}));
                }
            });
        };
        fetchFunc()
    };

    const base64DecodeToBlob = (fileData, contentType='', sliceSize=512) => {
        const byteChar = atob(fileData);
        const byteArrays = [];
      
        for (let offset = 0; offset < byteChar.length; offset += sliceSize) {
            const byteSlice = byteChar.slice(offset, offset + sliceSize);
      
            const byteNum = new Array(byteSlice.length);
            for (let i = 0; i < byteSlice.length; i += 1) {
                byteNum[i] = byteSlice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNum);
            byteArrays.push(byteArray);
        }
          
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
    };

    const getCharacterAvatar = async (characterId, avatarKey) => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userData.userId}/characters/${characterId}/?avatar=${avatarKey}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            const blobFile = base64DecodeToBlob(data.file_data, 'image/jpeg');
            const blobUrl = URL.createObjectURL(blobFile);
            console.log(blobUrl)
        });
    };

    useEffect(() => {
        if (userData && userData.userId && userData.token) {
            const fetchFunc = async () => {
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userData.userId}/characters/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    dispatch(addUserCharacters({characters: data}));
                });
            }
            fetchFunc();
        }
    }, []);

    return (
        <React.Fragment>
            <div className="user-profile-characters-wrap">
                <h2>User Characters</h2>
                <div className="user-profile-characters-controls-wrap">
                    <div className="user-profile-characters-add">
                        <span className="user-profile-characters-add-btn"></span>
                    </div>
                </div>
                <div className="user-profile-all-characters-wrap">
                    {userCharacters ? userCharacters.map((characterItem) => {
                        if (characterItem.avatar) {
                            getCharacterAvatar(characterItem.id, characterItem.avatar);
                        }
                        return (
                            <React.Fragment key={Math.random()}>
                                <div className="user-profile-character-item">
                                    <div className="user-profile-character-item-elem user-profile-character-elem-avatar"><img src="" /></div>
                                    <div className="user-profile-character-item-elem user-profile-character-elem-lvl">{characterItem.lvl}</div>
                                    <div className="user-profile-character-item-elem user-profile-character-elem-race">{characterItem.race}</div>
                                    <div className="user-profile-character-item-elem user-profile-character-elem-class">{characterItem.class}</div>
                                    <div className="user-profile-character-item-elem user-profile-character-elem-name">{characterItem.name}</div>
                                    <div className="user-profile-character-item-elem user-profile-character-elem-exp">0 / 100</div>
                                    <div className="user-profile-character-item-elem user-profile-character-elem-controls">
                                        <span className="edit-btn"></span>
                                        <span className="remove-btn" onClick={() => deleteCharacterHandler(characterItem)}></span>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }) : null}
                 </div>
            </div>
        </React.Fragment>
    )
};

export default UsersCharacters;