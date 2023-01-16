import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faNairaSign,
  faCircle
} from "@fortawesome/free-solid-svg-icons";

export function ShowErrors({ data }) {
    return (
        <div>
            {data != null ?
                <div>
                    <article class="message is-danger">
                        <div class="message-header">
                            <p>Errors</p>
                        </div>
                        <div class="message-body">
                            <ul>
                                
                            {data.errors.map((item, key) =>
                            <li>   <FontAwesomeIcon icon={faCircle} /> { item.msg }</li>
                            )}

                            </ul>
                        </div>
                    </article>
                    <pre> {JSON.stringify(data.errors, null, 2)}</pre>

                </div>

                : <p></p>

            }

        </div>
    )
}