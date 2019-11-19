import { NodeObj } from "../models/dataObjects/node";
import { AdjacencyList } from "../models/dataObjects/adjacencyList";
import { Edge } from "../models/dataObjects/edge";
import { AdjacencyGroup } from "../models/dataObjects/adjacencyGroup";

export class Algorithms {

    /**
     * Gets a node by id in a linked list.
     * @param id - The Id of the object which you want to get
     * @param multitrees - A multitrees of a graph
     * @returns A single node which matched the id or null if no object was found
     */
    static GetObjectById(id: string, multitrees: Array<NodeObj>): NodeObj | null {
  
      if (multitrees.length == 0)
        return null;
  
      let match: NodeObj | null;
  
      for (let node of multitrees) {
        if (node.id == id) {
          return node;
        } else {
          match = this.GetObjectById(id, node.childNodes);
          if (match != null)
            return match;
        }
      }
  
      return null;
    }
  
//   /**
//    * Gets a list of links which are related to an object by running a binarysearch against a sorted list
//    * @param id - The of the related data object
//    * @param searchType - States if you want to the the incoming links to an object (false) or the outgoing links (true)
//    * @param links - The found links
//    * @returns A single link which matched the id or null if no link was found
//    */
//     static GetEdgesByNodeId(id: string, adList: AdjacencyList): Array<Edge> {
      
//       let result: Array<Edge> = new Array<Edge>();
  
//       let group = adList.groups.get(id);
  
//       if (group == undefined) {
//         return result;
//       }
  
//       for (let edge of group.edges) {
//         result.push(link[1]);
//       }
  
//       return result;
//     }
  }