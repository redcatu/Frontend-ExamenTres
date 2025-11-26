import React, { useState } from 'react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

interface SearchFormProps {
    onSearch: (codigo: string) => void;
    isLoading?: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
    const [codigo, setCodigo] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (codigo.trim()) {
            onSearch(codigo);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-form animate-fadeIn">
            <Input
                label="Código de Factura"
                placeholder="Ej: 12345"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                disabled={isLoading}
            />
            <Button
                type="submit"
                isLoading={isLoading}
                disabled={!codigo.trim()}
                style={{ width: '100%', minWidth: '120px' }}
            >
                Buscar
            </Button>
        </form>
    );
};
