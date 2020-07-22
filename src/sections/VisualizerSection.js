import React from 'react';
import {observer} from 'mobx-react';

import EntryDisplayContainer from 'components/EntryDisplayContainer';

import combineClassnames from 'utilities/combineClassnames';
import {countNumLines} from 'utilities/stringUtils';

/**
 * @returns {React.Component}
 */
function VisualizerTooltip(props) {
  const {
    className,
    selectedEntry,
    previousEntry,
    style,
  } = props;

  const hasSelectedEntry = selectedEntry !== undefined;
  const contentDisplay = (selectedEntry && selectedEntry.entryString) || (previousEntry && previousEntry.entryString);

  return (
    <div
      className={combineClassnames('pad-4 borradius-2 bg-grayest fontsize-3 color-white whitespace-pre-wrap flex-col', className)}
      style={{
        position: 'fixed',
        top: 0,
        right: 30,
        transition: 'transform 500ms, opacity 300ms',
        opacity: hasSelectedEntry ? 1 : 0,
        ...style,
      }}>

      {contentDisplay}
    </div>
  )
}
/**
 * @returns {React.Component}
 */
export default observer(
function VisualizerSection(props) {
  const {entriesList = []} = props;

  // list state
  const [selectedEntry, setSelectedEntry] = React.useState();
  const [previousEntry, setPreviousEntry] = React.useState();
  const [focusedEntry, setFocusedEntry] = React.useState();

  // tooltip state 
  const [elementPosition, setFocusPosition] = React.useState({x: 10, y: 10});
  const [previousPosition, setPreviousPosition] = React.useState({x: 10, y: 10});

  const onSelectItem = (evt, newEntry) => {
    if (selectedEntry !== undefined && selectedEntry.id === newEntry.id) {
      setPreviousEntry(selectedEntry);
      setSelectedEntry(undefined);
      return;
    }

    const boundingClientRect = evt.currentTarget.getBoundingClientRect();
    const xPosition = boundingClientRect.x;
    const yOffset = countNumLines(newEntry.entryString) * -15;
    const yPosition = boundingClientRect.y + yOffset;
    setFocusPosition({x: xPosition, y: yPosition});

    setPreviousPosition(elementPosition);
    setPreviousEntry(selectedEntry);
    setSelectedEntry(newEntry);
  };

  const onMouseEnterItem = (evt, newEntry) => {
    setFocusedEntry(newEntry);
  };

  const onMouseLeaveItem = () => {
    setFocusedEntry(undefined);
  };

  const hasFocusedEntry = focusedEntry !== undefined;
  const hasSelectedEntry = selectedEntry !== undefined;

  const positionToUse = hasSelectedEntry ? elementPosition : previousPosition;
  const detailsStyle = {
    transform: `translate(${positionToUse.x}px, ${positionToUse.y}px)`,
  };

  return (
    <div className='flex-col adjacent-mar-t-5'>      
      { entriesList.map((logEntry, idx) => (
        <EntryDisplayContainer 
          onClick={(evt) => onSelectItem(evt, logEntry)}
          onMouseEnter={(evt) => onMouseEnterItem(evt, logEntry)}
          onMouseLeave={onMouseLeaveItem}

          isSelected={hasSelectedEntry && logEntry.id === selectedEntry.id}
          isFocused={hasFocusedEntry && logEntry.id === focusedEntry.id}

          logEntry={logEntry}
          className='visualizer-cell adjacent-mar-t-2'
          key={`entry-display-${logEntry.id}-key`} />
      ))}

      <VisualizerTooltip
        selectedEntry={selectedEntry}
        previousEntry={previousEntry}
        className='zindex-3'
        style={detailsStyle} />
    </div>
  )
})