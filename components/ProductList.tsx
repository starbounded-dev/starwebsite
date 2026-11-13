import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./Icons";
import { Bounds } from "./Bounds";
import { products } from "@/lib/products";

export function ProductList() {
  return (
    <div className="product-list">
      {products.map((product) => (
        <Link
          key={product.slug}
          href={product.href}
          className="product-row"
          data-product={product.slug}
        >
          <span className="product-tile">
            <Image src={product.logo} alt="" width={144} height={144} />
          </span>
          <div className="product-name">
            <h3>{product.name}</h3>
            <span className="status">
              <i className="status-dot" aria-hidden="true" />
              {product.status}
            </span>
          </div>
          <div className="product-summary">
            <p>{product.summary}</p>
            <ul className="product-meta" role="list">
              {product.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>
          <span className="product-go" aria-hidden="true">
            <Arrow />
          </span>
        </Link>
      ))}
      <div className="product-row">
        <span className="product-tile empty" aria-hidden="true">
          <Bounds />
        </span>
        <div className="product-name">
          <h3>Next up</h3>
          <span className="status">
            <i className="status-dot idle" aria-hidden="true" />
            Unannounced
          </span>
        </div>
        <div className="product-summary">
          <p>
            The next tool is still taking shape. It gets a name and a page here
            once there is something you can run.
          </p>
        </div>
      </div>
    </div>
  );
}
