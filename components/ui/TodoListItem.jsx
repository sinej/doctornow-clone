'use client'

import React, {useState} from 'react';
import {CiCircleCheck, CiEdit} from "react-icons/ci";
import {AiOutlineDelete} from "react-icons/ai";

const TodoListItem = ({id, content, onDelete, onUpdate}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [userInput, setUserInput] = useState(content ?? "");

  const handleStartEdit = () => {
    setIsEdit(true);
  }

  const handleFinishEdit = () => {
    onUpdate(id, userInput);
    setIsEdit(false);
  }

  const handleDelete = () => {
    onDelete(id);
  }

  return (
    <li className="min-h-[60px] bg-neutral-200 border border-black rounded-2xl font-bold group">
      <article className="min-h-[60px] p-4 flex flex-col sm:flex-row gap-4">
        {
          isEdit ? (
            <input className="flex-1 text-[18px]"
                   value={userInput}
                   onChange={(e) => {
                     setUserInput(e.target.value);
                   }}
            />
          ) : (
            <div onClick={handleStartEdit}
                 className="flex-1 text-[18px] cursor-pointer"
            >
              {content}
            </div>
          )
        }
        <div className="self-end w-fit hidden group-hover:flex gap-2">
          {isEdit ?
            <div className="h-11 w-11 flex items-center justify-center cursor-pointer"
                 onClick={handleFinishEdit}
            >
              <CiCircleCheck size={30} />
            </div> :
            <div onClick={handleStartEdit}
                 className="h-11 w-11 flex items-center justify-center cursor-pointer"
            >
              <CiEdit size={30} />
            </div>
          }
          <div onClick={handleDelete}
               className="h-11 w-11 flex items-center justify-center cursor-pointer"
          >
            <AiOutlineDelete size={30} />
          </div>
        </div>
      </article>
    </li>
  );
};

export default TodoListItem;