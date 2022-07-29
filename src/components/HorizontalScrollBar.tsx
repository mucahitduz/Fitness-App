import React, { FC } from 'react'
import { Box } from '@mui/material'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import ExerciseCard from './ExerciseCard';
import BodyPart from './BodyPart'
import useDrag from '../hooks/useDrag';
import { Exercise } from '../types/types';

interface HorizontalScrollBarProps { 
    data: string[] | Exercise[]
    bodyPart?: string
    bodyParts?: string[]
    setBodyPart?: (bodyPart: string) => void
}

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const HorizontalScrollBar: FC<HorizontalScrollBarProps> = ({ data, bodyParts, bodyPart, setBodyPart }) => {

  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag = ({ scrollContainer }: scrollVisibilityApiType) => (
    ev: React.MouseEvent
  ) =>
    dragMove(ev, (posDiff) => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft += posDiff;
      }
    });  

  function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
  } 

  return (
    <ScrollMenu
      onWheel={onWheel}
      onMouseDown={() => dragStart}
      onMouseUp={() => dragStop}
      onMouseMove={handleDrag}
    >
          {data.map((item: any) => (              
              <Box
                key={item.id || item}
                itemID={item.id || item}
                title={item.id || item}
                m="0 40px"
              >         
                  {bodyParts ? <BodyPart item={item} setBodyPart={setBodyPart as (bodyPart: string) => void} bodyPart={bodyPart as string} /> : <ExerciseCard exercise={item} /> }
             </Box>
          )
          )}
    </ScrollMenu>
  )
}

export default HorizontalScrollBar