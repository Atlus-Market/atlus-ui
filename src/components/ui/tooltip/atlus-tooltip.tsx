import { PlacesType, Tooltip } from 'react-tooltip';

interface AtlusTooltipProps {
  tooltipId: string; // Must be present or the tooltip won't show up
  place?: PlacesType;
}

/**
 *
 * @param tooltipId used to reference the parent element to show the tooltip on.
 * @param place
 * @constructor
 * Usage: The parent element (or group of elements) must have 2 properties:
 * * data-tooltip-id: Must be the same as tooltipId prop
 * * data-tooltip-content: Text to show on the tooltip.
 * DO NOT render many of this component for lists. Instead, use a single AtlusTooltip
 * component, all referencing the same data-tooltip-id but with different data-tooltip-content
 * because it has performance issues.
 */
export const AtlusTooltip = ({
                               tooltipId,
                               place = 'top'
                             }: AtlusTooltipProps) => {
  return (
    // Hide tooltip pn small screens (mobile)
    <div className="hidden md:inline-block">
      <Tooltip
        id={tooltipId}
        place={place}
        className='!bg-dark-grey !text-white !font-medium !text-xs !py-2 !px-3 z-[1] z-10'
        noArrow={true}
        render={({ content, activeAnchor }) => <span>{content}</span>}
      />
    </div>
  );
};
