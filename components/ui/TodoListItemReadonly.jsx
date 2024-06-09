'use client'

import React from 'react';

const TodoListItemReadonly = ({content}) => {

  return (
    <li className="min-h-[60px] bg-neutral-200 border border-black rounded-2xl font-bold group">
      <article className="min-h-[60px] p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 text-[18px] cursor-pointer">
          {content}
        </div>
      </article>
    </li>
  );
};

export default TodoListItemReadonly;