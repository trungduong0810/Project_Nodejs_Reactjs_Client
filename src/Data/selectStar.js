import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const dataSelectStar = [
  {
    id: 1,
    label: "Tất cả",
    value: "All",
  },
  {
    id: 2,
    label: (
      <span>
        1 <FontAwesomeIcon icon={faStar} className="text-yellow-500"/>
      </span>
    ),
    value: 1,
  },

  {
    id: 3,
    label: (
      <span>
        2 <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
      </span>
    ),
    value: 2,
  },
  {
    id: 4,
    label: (
      <span>
        3 <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
      </span>
    ),
    value: 3,
  },
  {
    id: 5,
    label: (
      <span>
        4 <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
      </span>
    ),
    value: 4,
  },

  {
    id: 6,
    label: (
      <span>
        5 <FontAwesomeIcon icon={faStar} className="text-yellow-500"/>
      </span>
    ),
    value: 5,
  },
];
